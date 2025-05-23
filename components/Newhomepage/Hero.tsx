import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  Text,
  ListItem,
  ListIcon,
  List,
  Badge,
} from "@chakra-ui/react"; // Added HStack, Image, Text
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
// import Demo from "./Demo";

const Hero = () => {
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
        marginTop={{ base: 0, lg: 0 }}
      >
        <VStack
          className="color"
          alignItems={{ base: "center", sm: "center" }}
          spacing={{ base: 3, sm: 3 }}
          justifyContent="center"
          flexDirection="column"
        >
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
          <Box textAlign={{ base: "center", sm: "center" }}>
            <Box
              mb={3}
              as="h3"
              lineHeight={{ base: "1.1rem", sm: "1.1rem" }}
              fontSize={{ base: "0.7rem", sm: "1rem" }}
              fontWeight="grey"
              marginX="auto"
            >
              Der <b>#1</b> KI Bewerbungsfoto-Generator für professionelle {""}
              Bewerbungsfotos.
            </Box>
            <Box
              mb={3}
              as="h1"
              lineHeight={{ base: "2.1rem", sm: "2.7rem" }}
              fontSize={{ base: "2rem", sm: "2.4rem" }}
              fontWeight="extrabold"
              marginX="auto"
            >
              Professionelle Bewerbungsfoto selber machen
            </Box>

            <VStack>
              <List>
                <ListItem display="flex" alignItems="center">
                  <Text as="span" flex="1">
                    <CheckIcon color="green.500" mr={2} />
                    Erstelle in 20 Minuten realistische Bewerbungsfotos mit KI
                  </Text>
                </ListItem>
              </List>
              <List>
                <ListItem display="flex" alignItems="center">
                  <Text as="span" flex="1">
                    <CheckIcon color="green.500" mr={2} />
                    Bereit für Lebenslauf, Linkedin, Indeed usw.
                  </Text>
                </ListItem>
              </List>
              <List>
                <ListItem display="flex" alignItems="center">
                  <Text as="span" flex="1">
                    {" "}
                    <CheckIcon color="green.500" mr={2} />
                    Kostet nur €20
                  </Text>
                </ListItem>
              </List>
            </VStack>
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
          <Box
            mb={1}
            as="h3"
            lineHeight={{ base: "1.1rem", sm: "1.1rem" }}
            fontSize={{ base: "0.8rem", sm: "1rem" }}
            fontWeight="grey"
            marginX="auto" // Added marginX="auto" for good measure, though parent textAlign should handle it
          >
            Steigere deinen Marktwert in Sekunden!
          </Box>

          {/* Trustpilot Rating Section */}
          <HStack spacing={2} alignItems="center">
            <Image
              src="/trustpilot-stars.svg" // Added the .svg extension here
              alt="Trustpilot 4.8 stars"
              height={{ base: "20px", sm: "24px" }}
            />
            <Text fontSize={{ base: "0.8rem", sm: "1rem" }} fontWeight="medium">
              Rated <b>4.8</b> out of <b>5</b> on
            </Text>
            <Image
              src="/logo-trustpilot.png"
              alt="Trustpilot logo"
              height={{ base: "20px", sm: "24px" }}
            />
          </HStack>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default Hero;
