"use client";

import { Icons } from "@/components/icons";
import { Database } from "@/types/supabase";
import { imageRow, modelRow, sampleRow } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  useColorModeValue,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

export const revalidate = 0;

type ClientSideModelProps = {
  serverModel: modelRow;
  serverImages: imageRow[];
  samples: sampleRow[];
};

export default function ClientSideModel({
  serverModel,
  serverImages,
  samples,
}: ClientSideModelProps) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [model, setModel] = useState<modelRow>(serverModel);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-model")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "models" },
        (payload: { new: modelRow }) => {
          setModel(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setModel]);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("gray.800", "white");
  const subheadingColor = useColorModeValue("gray.700", "gray.200");
  const sectionBg = useColorModeValue("gray.50", "gray.900");

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  return (
    <Box width="full" py={6} px={{ base: 4, md: 0 }}>
      <VStack spacing={8} align="stretch">
        <SimpleGrid row={{ base: 2, lg: 2 }} spacing={8} width="full">
          {samples && samples.length > 0 && (
            <Box
              borderRadius="xl"
              overflow="hidden"
              bg={bgColor}
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="md"
              p={6}
            >
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="md" color={subheadingColor}>
                  Training Data
                </Heading>
                <Divider />
                <SimpleGrid
                  columns={{ base: 3, sm: 3, md: 6 }}
                  spacing={4}
                  width="full"
                >
                  {samples.map((sample) => (
                    <Box
                      key={sample.id}
                      borderRadius="md"
                      overflow="hidden"
                      boxShadow="sm"
                      transition="transform 0.2s"
                      _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                      onClick={() => handleImageClick(sample.uri)}
                      tabIndex={0} // Add this line
                      role="button" // Add for accessibility
                      onKeyDown={(e) => {
                        // Optional: Allow keyboard activation
                        if (e.key === "Enter" || e.key === " ") {
                          handleImageClick(sample.uri);
                        }
                      }}
                    >
                      <AspectRatio ratio={1}>
                        <Image
                          src={sample.uri}
                          alt="Training sample"
                          objectFit="cover"
                        />
                      </AspectRatio>
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          )}

          <Box
            borderRadius="xl"
            overflow="hidden"
            bg={bgColor}
            borderWidth="1px"
            borderColor={borderColor}
            boxShadow="md"
            p={6}
          >
            <VStack align="start" spacing={4} height="full">
              {model.status === "finished" ? (
                <>
                  <Heading as="h3" size="md" color={subheadingColor}>
                    Generated Headshots
                  </Heading>
                  <Divider />
                  <SimpleGrid
                    columns={{ base: 2, sm: 2, md: 4 }}
                    spacing={4}
                    width="full"
                  >
                    {serverImages?.map((image) => (
                      <Box
                        key={image.id}
                        borderRadius="md"
                        overflow="hidden"
                        boxShadow="sm"
                        transition="transform 0.2s"
                        _hover={{ transform: "scale(1.02)", cursor: "pointer" }}
                        onClick={() => handleImageClick(image.uri)}
                        tabIndex={0} // Add this line
                        role="button" // Add for accessibility
                        onKeyDown={(e) => {
                          // Optional: Allow keyboard activation
                          if (e.key === "Enter" || e.key === " ") {
                            handleImageClick(image.uri);
                          }
                        }}
                      >
                        <AspectRatio ratio={1}>
                          <Image
                            src={image.uri}
                            alt="Generated headshot"
                            objectFit="cover"
                          />
                        </AspectRatio>
                      </Box>
                    ))}
                  </SimpleGrid>
                </>
              ) : (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  height="full"
                  width="full"
                  py={10}
                  bg={sectionBg}
                  borderRadius="lg"
                >
                  <Icons.spinner className="h-12 w-12 animate-spin text-brand-500 mb-4" />
                  <Text fontSize="lg" fontWeight="medium" color={headingColor}>
                    Your model is being trained
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    mt={2}
                    textAlign="center"
                  >
                    This process typically takes about 20 minutes.
                    <br />
                    You'll receive an email when it's ready.
                  </Text>
                </Flex>
              )}
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>

      {selectedImage && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent
            width="fit-content"
            maxWidth="90vw"
            maxHeight="90vh" // Ensure content doesn't overflow vertically either
            onClick={onClose} // Keep this for mobile usability
            cursor="pointer" // Keep this
          >
            <ModalBody p={0}>
              {" "}
              {/* onClick and cursor moved to ModalContent */}
              <Image
                src={selectedImage}
                alt="Bewerbungsfoto"
                objectFit="contain"
                maxH="90vh" // Image max height
                maxW="100%" // Image fills the new fit-content width of ModalContent
                // onClick={(e) => e.stopPropagation()}
                onClick={onClose} // Keep this for mobile usability
                cursor="pointer" // Prevent image click from closing if ModalBody handles it
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
