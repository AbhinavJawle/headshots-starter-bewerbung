import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  Text,
  Badge,
} from "@chakra-ui/react"; // Added HStack, Image, Text
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { CheckIcon } from "@chakra-ui/icons";
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
              as="h2"
              // Removed maxWidth="rem" as it seemed incomplete/incorrect
              lineHeight={{ base: "2.3rem", sm: "3rem" }}
              fontSize={{ base: "2rem", sm: "2.6rem" }}
              fontWeight="extrabold"
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
          <p className="self-center">
            Ihre Fotos werden gelöscht sobald der Prozess fertig ist.
          </p>
        </VStack>
        <HStack justifyContent="center" spacing={4} mt={4}>
          <Flex justifyContent="center" py={1}>
            <Badge colorScheme="gray" px={2} py={1} borderRadius="full">
              <HStack spacing={1} alignItems="center">
                <CheckIcon color="green.500" boxSize={3} />
                <Text
                  fontSize={{ base: "0.7rem", sm: "0.9rem" }}
                  fontWeight="medium"
                >
                  Made in EU
                </Text>
                <Text fontSize={{ base: "0.7rem", sm: "0.9rem" }}>🇪🇺</Text>
              </HStack>
            </Badge>
          </Flex>
          <Flex justifyContent="center" py={1}>
            <Badge colorScheme="gray" px={2} py={1} borderRadius="full">
              <HStack spacing={1} alignItems="center">
                <CheckIcon color="green.500" boxSize={3} />
                <Text
                  fontSize={{ base: "0.7rem", sm: "0.9rem" }}
                  fontWeight="medium"
                >
                  GDPR COMPLIANT
                </Text>
                <Text fontSize={{ base: "0.7rem", sm: "0.9rem" }}>🇪🇺</Text>
              </HStack>
            </Badge>
          </Flex>
        </HStack>
      </SimpleGrid>
    </Box>
  );
};

export default EndCTA;
