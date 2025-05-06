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
        marginTop={{ base: 1, lg: 4 }}
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
              as="h3"
              // Removed maxWidth="rem" as it seemed incomplete/incorrect
              lineHeight={{ base: "1.1rem", sm: "1.1rem" }}
              fontSize={{ base: "0.7rem", sm: "1rem" }}
              fontWeight="grey"
              marginX="auto" // Added marginX="auto" for good measure, though parent textAlign should handle it
            >
              Der <b>#1</b> KI Bewerbungsfoto-Generator für professionelle {""}
              Bewerbungsfotos.
            </Box>
            <Box
              mb={3}
              as="h1"
              // Removed maxWidth="rem" as it seemed incomplete/incorrect
              lineHeight={{ base: "2.3rem", sm: "3rem" }}
              fontSize={{ base: "2rem", sm: "2.6rem" }}
              fontWeight="black"
              marginX="auto" // Added marginX="auto" for good measure, though parent textAlign should handle it
            >
              Steigere deinen Marktwert in Sekunden
            </Box>
            {/* <Box
              as="h2"
              maxWidth="50rem"
              fontSize={{ base: "md", sm: "xl" }}
              lineHeight={{ base: "xl", sm: "2xl" }}
              marginX="auto" // Add this to center the h2 Box itself
            >
              <Text>
                {" "}
                Moderne Bewerbungsfotos mit KI: Professionelle Bewerbungsfotos
                selber machen – Kostenlos testen, im Handumdrehen erstellen
              </Text>
            </Box> */}
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
                    Kostet nur €10
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
            mb={3}
            as="h3"
            // Removed maxWidth="rem" as it seemed incomplete/incorrect
            lineHeight={{ base: "1.1rem", sm: "1.1rem" }}
            fontSize={{ base: "0.8rem", sm: "1rem" }}
            fontWeight="grey"
            marginX="auto" // Added marginX="auto" for good measure, though parent textAlign should handle it
          >
            Bewerbungsfoto machen Sie selber!
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
        {/* <Flex alignItems="center">
          <Demo />
        </Flex> */}
      </SimpleGrid>
    </Box>
  );
};

export default Hero;
