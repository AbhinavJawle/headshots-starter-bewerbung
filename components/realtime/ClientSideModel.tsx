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
  IconButton,
} from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";

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
  const [isDownloading, setIsDownloading] = useState<string | null>(null); // To track which image is downloading

  const handleDownloadImage = async (imageUrl: string, imageName: string) => {
    setIsDownloading(imageName);
    try {
      const proxyUrl = `/api/download-image?url=${encodeURIComponent(
        imageUrl
      )}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const blob = await response.blob();
      saveAs(blob, imageName);
    } catch (error) {
      console.error("Error downloading image:", error);
      // Optionally, show a toast notification for the error
    } finally {
      setIsDownloading(null);
    }
  };

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
  }, [supabase, model, setModel]);

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
                  Ihre hochgeladenen Bilder
                </Heading>
                <Text as="h5" size="sm" color={subheadingColor}>
                  Klicken Sie auf ein Bild, um es zu öffnen
                </Text>

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
                      position="relative" // Needed for absolute positioning of the badge
                      onClick={() => handleImageClick(sample.uri)}
                      tabIndex={0}
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
                    Generierte Bewerbungsfotos ({serverImages.length})
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
                        position="relative" // Needed for absolute positioning of the badge
                        onClick={() => handleImageClick(image.uri)}
                        tabIndex={0}
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
                          <IconButton
                            icon={<FaDownload />}
                            aria-label="Download image"
                            size="sm" // Increased size
                            colorScheme="blue"
                            variant="solid"
                            isRound
                            position="absolute"
                            top={3} // Adjusted position
                            right={3} // Adjusted position
                            zIndex={1} // Ensure it's above the image
                            boxShadow="md" // Added shadow for better visibility
                            _hover={{ bg: "blue.600" }} // Enhanced hover state
                            isLoading={
                              isDownloading === `headshot_${image.id}.jpg`
                            }
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent modal from opening
                              handleDownloadImage(
                                image.uri,
                                `headshot_${image.id}.jpg`
                              );
                            }}
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
                    Dein Bewerbungsfoto KI-Modell wird trainiert
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    mt={2}
                    textAlign="center"
                  >
                    Dieser Prozess dauert typischerweise etwa 20 Minuten.
                    <br />
                    Du erhältst eine E-Mail, wenn es fertig ist.
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
