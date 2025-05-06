import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react"; // Added HStack, Image, Text
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
// import Demo from "./Demo";

const EndCTA = () => {
  return (
    <Box px={{ base: 2, md: 2 }}>
      <SimpleGrid
        as="main"
        minHeight="30rem"
        flex="1"
        flexDirection="column"
        marginX="auto" // Keep this for overall centering
        maxWidth="container.md"
        columns={{ base: 1, lg: 1 }}
        px={{ base: 4, lg: 4 }}
        py={{ base: 10, lg: 10 }}
        gap={{ base: 10, lg: 10 }}
        marginTop={{ base: 1, lg: 1 }}
      >
        <VStack
          className="color"
          alignItems={{ base: "center", sm: "center" }}
          spacing={10}
          justifyContent="center"
          flexDirection="column"
        >
          <Box textAlign={{ base: "center", sm: "center" }}>
            <Box
              mb={3}
              as="h1"
              // Removed maxWidth="rem" as it seemed incomplete/incorrect
              lineHeight={{ base: "2.3rem", sm: "3rem" }}
              fontSize={{ base: "2rem", sm: "2.6rem" }}
              fontWeight="black"
              marginX="auto" // Added marginX="auto" for good measure, though parent textAlign should handle it
            >
              Erhalten Sie Ihre Bewerbungsfotos heute
            </Box>
            <Box
              as="h2"
              maxWidth="50rem"
              fontSize={{ base: "xs", sm: "xl" }}
              lineHeight={{ base: "xl", sm: "2xl" }}
              marginX="auto" // Add this to center the h2 Box itself
            >
              Bewerbungsfotos, die Sie tatsächlich nutzen können, ohne in ein
              teures Studio zu gehen
            </Box>
          </Box>
          <Button
            as={Link}
            href="/login"
            variant="brand"
            size="lg"
            shadow="xl"
            rightIcon={<HiArrowRight />}
          >
            Bewerbungsfotos erstellen
          </Button>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default EndCTA;
