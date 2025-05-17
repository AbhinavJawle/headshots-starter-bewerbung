"use client";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Text,
  Image,
  SimpleGrid,
  Spinner,
  Heading,
  LinkOverlay,
  LinkBox,
  Container,
  Divider,
  Badge,
  useColorModeValue,
  VStack,
  Center,
} from "@chakra-ui/react";

interface Pack {
  id: number;
  title: string;
  cover_url?: string;
  slug?: string;
  category: string;
}

export default function PacksGalleryZone() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Theme colors
  const cardBg = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const dividerColor = useColorModeValue("gray.300", "gray.600");
  const mainCardBg = useColorModeValue("blue.50", "blue.900");
  const mainCardBorder = useColorModeValue("blue.200", "blue.700");
  const badgeBg = useColorModeValue("blue.100", "blue.700");
  const badgeColor = useColorModeValue("blue.800", "blue.100");

  const fetchPacks = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<Pack[]>("/astria/packs");
      setPacks(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error fetching packs",
          description: err.message,
          duration: 5000,
        });
      } else {
        toast({
          title: "Unknown error",
          description: "An unknown error occurred.",
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  if (loading) {
    return (
      <Center h="300px">
        <VStack spacing={4}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text>Laden...</Text>
        </VStack>
      </Center>
    );
  }

  if (packs.length === 0) {
    return (
      <Box textAlign="center" py={12}>
        <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")}>
          Keine Pakete verfügbar.
        </Text>
      </Box>
    );
  }

  // Find the main pack (Bewerbungsfoto)
  const mainPack = packs.find((pack) => pack.category === "corporate");
  // Get all other packs
  const otherPacks = packs.filter((pack) => pack.category !== "corporate");

  const getCategoryLabel = (category: string): string => {
    const categories: Record<string, string> = {
      lawyer: "Anwalt",
      doctor: "Arzt",
      realtor: "Immobilienmakler",
      speaker: "Redner",
      corporate: "Business",
    };
    return categories[category] || category;
  };

  return (
    <Box width="100%" overflow="hidden">
      <Container maxW="container.xl" py={8} px={{ base: 4, md: 6 }}>
        {/* Main Featured Pack */}
        {mainPack && (
          <LinkBox
            as="article"
            w="full"
            bg={mainCardBg}
            borderRadius="xl"
            overflow="hidden"
            transition="all 0.3s ease-in-out"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl",
            }}
            boxShadow="md"
            borderWidth="1px"
            borderColor={mainCardBorder}
            mb={8}
          >
            <NextLink
              href={`/overview/models/train/${mainPack.slug || mainPack.id}`}
              passHref
              legacyBehavior
            >
              <LinkOverlay>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  h={{ md: "400px" }}
                >
                  <Box
                    flex={{ md: "1" }}
                    position="relative"
                    h={{ base: "300px", md: "full" }}
                  >
                    <Image
                      src={
                        mainPack.cover_url ||
                        "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png"
                      }
                      alt={mainPack.title}
                      w="full"
                      h="full"
                      objectFit="cover"
                      objectPosition="top"
                    />
                    <Badge
                      position="absolute"
                      top={4}
                      left={4}
                      bg={badgeBg}
                      color={badgeColor}
                      px={3}
                      py={1}
                      borderRadius="md"
                      fontWeight="bold"
                    >
                      Empfohlen
                    </Badge>
                  </Box>
                  <Box
                    flex={{ md: "1" }}
                    p={{ base: 6, md: 8 }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Heading
                      as="h2"
                      size={{ base: "lg", md: "xl" }}
                      color={textColor}
                      fontWeight="bold"
                      mb={4}
                    >
                      Bewerbungsfoto
                    </Heading>
                    <Text fontSize={{ base: "md", md: "lg" }} mb={6}>
                      Professionelle Bewerbungsfotos für Ihren beruflichen
                      Erfolg. Erstellen Sie das perfekte Foto für Ihren
                      Lebenslauf und Online-Profile.
                    </Text>
                    <Badge
                      alignSelf="flex-start"
                      colorScheme="blue"
                      fontSize="md"
                      px={3}
                      py={1}
                    >
                      {getCategoryLabel(mainPack.category)}
                    </Badge>
                  </Box>
                </Flex>
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        )}

        <Divider my={8} borderColor={dividerColor} borderWidth="2px" />

        <Heading as="h3" size="lg" mb={6} textAlign="center">
          Weitere Foto-Pakete
        </Heading>

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={6}
          mx="auto"
        >
          {otherPacks.map((pack) => (
            <LinkBox
              key={pack.id}
              as="article"
              bg={cardBg}
              borderRadius="lg"
              overflow="hidden"
              transition="all 0.3s ease-in-out"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "lg",
                bg: cardHoverBg,
              }}
              boxShadow="base"
              borderWidth="1px"
              borderColor={dividerColor}
            >
              <NextLink
                href={`/overview/models/train/${pack.slug || pack.id}`}
                passHref
                legacyBehavior
              >
                <LinkOverlay>
                  <Image
                    src={
                      pack.cover_url ||
                      "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png"
                    }
                    alt={pack.title}
                    w="full"
                    h="200px"
                    objectFit="cover"
                    objectPosition="top"
                  />
                  <Box p={4}>
                    <Heading
                      as="h3"
                      size="md"
                      color={textColor}
                      mb={2}
                      noOfLines={1}
                    >
                      {getCategoryLabel(pack.category)}
                    </Heading>
                    <Badge
                      colorScheme={
                        pack.category === "lawyer"
                          ? "purple"
                          : pack.category === "doctor"
                          ? "green"
                          : pack.category === "realtor"
                          ? "orange"
                          : pack.category === "speaker"
                          ? "red"
                          : "gray"
                      }
                    >
                      {pack.category}
                    </Badge>
                  </Box>
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
