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
  Progress,
  useColorModeValue,
  Heading,
  LinkOverlay,
  LinkBox,
  Container,
  Divider,
} from "@chakra-ui/react";

interface Pack {
  id: string;
  title: string;
  cover_url: string;
  slug: string;
  category?: string;
}

export default function PacksGalleryZone() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Categorized packs
  const [corporatePacks, setCorporatePacks] = useState<Pack[]>([]);
  const [lawyerPacks, setLawyerPacks] = useState<Pack[]>([]);
  const [medicinePacks, setMedicinePacks] = useState<Pack[]>([]);
  const [realtorPacks, setRealtorPacks] = useState<Pack[]>([]);
  const [casualPacks, setCasualPacks] = useState<Pack[]>([]);
  const [modelPacks, setModelPacks] = useState<Pack[]>([]);

  const cardBg = useColorModeValue("gray.700", "gray.800"); // Darker background for cards
  const cardHoverBg = useColorModeValue("gray.600", "gray.700");
  const textColor = useColorModeValue("white", "whiteAlpha.900");
  const loaderColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("blue.500", "blue.300");
  const sectionBg = useColorModeValue("gray.100", "gray.900");

  const fetchPacks = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<Pack[]>("/astria/packs");
      const fetchedPacks = response.data;
      setPacks(fetchedPacks);

      // Categorize packs based on index in the array
      // First 5 are corporate
      setCorporatePacks(
        fetchedPacks
          .slice(0, 5)
          .map((pack) => ({ ...pack, category: "corporate" }))
      );
      // Next 3 are lawyers
      setLawyerPacks(
        fetchedPacks
          .slice(5, 8)
          .map((pack) => ({ ...pack, category: "lawyer" }))
      );
      // Next 1 is medicine
      setMedicinePacks(
        fetchedPacks
          .slice(8, 9)
          .map((pack) => ({ ...pack, category: "medicine" }))
      );
      // Next 1 is realtor
      setRealtorPacks(
        fetchedPacks
          .slice(9, 10)
          .map((pack) => ({ ...pack, category: "realtor" }))
      );
      // Next 5 are casual
      setCasualPacks(
        fetchedPacks
          .slice(10, 15)
          .map((pack) => ({ ...pack, category: "casual" }))
      );
      // Next 3 are model
      setModelPacks(
        fetchedPacks
          .slice(15, 18)
          .map((pack) => ({ ...pack, category: "model" }))
      );
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
      <Flex direction="column" align="center" justify="center" h="256px">
        <Progress
          size="xs"
          isIndeterminate
          width="150px"
          colorScheme="blue"
          mb={4}
        />
        <Text fontSize="sm" color={loaderColor}>
          Laden...
        </Text>
      </Flex>
    );
  }

  if (packs.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")}>
          No packs available.
        </Text>
      </Box>
    );
  }

  // Render a category section with its packs
  const renderCategorySection = (title: string, categoryPacks: Pack[]) => {
    if (categoryPacks.length === 0) return null;

    return (
      <Box mb={10} py={6} px={4} borderRadius="lg" bg={sectionBg}>
        <Heading
          as="h2"
          size="lg"
          mb={6}
          color={headingColor}
          textAlign="center"
          textTransform="uppercase"
          fontWeight="bold"
        >
          {title}
        </Heading>
        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            md: 3,
            lg: 3,
          }}
          spacing={6}
        >
          {categoryPacks.map((pack) => (
            <LinkBox
              key={pack.id}
              as="article"
              w="full"
              bg={cardBg}
              borderRadius="lg"
              overflow="hidden"
              transition="all 0.3s ease-in-out"
              _hover={{
                transform: "scale(1.03)",
                boxShadow: "xl",
                bg: cardHoverBg,
              }}
              boxShadow="lg"
            >
              <NextLink
                href={`/overview/models/train/${pack.slug}`}
                passHref
                legacyBehavior
              >
                <LinkOverlay>
                  <Image
                    src={
                      pack.cover_url ??
                      "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png"
                    }
                    alt={pack.title}
                    w="full"
                    h="200px"
                    objectFit="cover"
                  />
                  <Box p={4} textAlign="center">
                    <Heading
                      as="h3"
                      size="sm"
                      color={textColor}
                      textTransform="capitalize"
                      noOfLines={2}
                    >
                      Bewerbungsfoto
                      {/* {pack.title} */}
                    </Heading>
                  </Box>
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  return (
    <Container maxW="container.xl" py={8}>
      {renderCategorySection("Corporate", corporatePacks)}
      {renderCategorySection("Lawyers", lawyerPacks)}
      {renderCategorySection("Medicine", medicinePacks)}
      {renderCategorySection("Realtor", realtorPacks)}
      {renderCategorySection("Casual", casualPacks)}
      {renderCategorySection("Model", modelPacks)}
    </Container>
  );
}
