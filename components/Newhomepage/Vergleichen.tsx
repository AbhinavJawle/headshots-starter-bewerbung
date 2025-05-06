import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Button,
  VStack,
  HStack,
  Icon,
  Center,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons"; // Using Chakra icons for simplicity
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";

// Helper component for list items with icons
const FeatureListItem = ({ children, icon, iconColor }: any) => (
  <ListItem display="flex" alignItems="center" mb={2}>
    <ListIcon as={icon} color={iconColor} w={5} h={5} mr={2} />
    <Text fontSize={{ base: "sm", md: "md" }}>{children}</Text>
  </ListItem>
);

// Helper component for numbered list items
const NumberedListItem = ({ number, title, description }: any) => (
  <ListItem display="flex" alignItems="start" mb={4}>
    <Center
      bg="blue.500" // Example color, adjust as needed
      color="white"
      borderRadius="full"
      w={6}
      h={6}
      minW={6} // Ensure circle size is consistent
      mr={3}
      fontSize="sm"
      fontWeight="bold"
    >
      {number}
    </Center>
    <Box>
      <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
        {title}
      </Text>
      <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
        {description}
      </Text>
    </Box>
  </ListItem>
);

function Vergleichen() {
  return (
    <Box py={{ base: 8, md: 16 }} px={{ base: 4, md: 12 }} bg="white">
      <VStack spacing={4} textAlign="center" mb={{ base: 8, md: 12 }}>
        {/* Trustpilot Rating */}
        <HStack spacing={2} alignItems="center" justifyContent="center">
          <Image
            src="/trustpilot-stars.svg"
            alt="Trustpilot 4.8 Sterne" // Translated alt text
            height={{ base: "20px", sm: "24px" }}
          />
          <Text fontSize={{ base: "0.8rem", sm: "1rem" }} fontWeight="medium">
            Bewertet mit <b>4.8</b> von <b>5</b> auf
          </Text>
          <Image
            src="/logo-trustpilot.png"
            alt="Trustpilot Logo" // Alt text can remain or be translated
            height={{ base: "20px", sm: "24px" }}
          />
        </HStack>

        {/* <Heading as="h2" size="xl" fontWeight="black">
        </Heading> */}
        <Box
          mb={3}
          as="h2"
          // Removed maxWidth="rem" as it seemed incomplete/incorrect
          lineHeight={{ base: "2.3rem", sm: "3rem" }}
          fontSize={{ base: "2rem", sm: "2.6rem" }}
          fontWeight="black"
          marginX="auto" // Added marginX="auto" for good measure, though parent textAlign should handle it
        >
          Wie Ihre Selfies zu professionellen Bewerbungsfotos werden
        </Box>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="gray.600"
          maxW="container.md"
          mx="auto"
        >
          Sparen Sie Hunderte von Euro und Stunden an Zeit, indem Sie
          HeadshotPro verwenden, um Ihre neuen professionellen
          Lieblings-Bewerbungsfotos zu generieren.
        </Text>
      </VStack>

      <Flex
        direction={{ base: "column", lg: "row" }}
        alignItems="center"
        justifyContent="center"
        gap={{ base: 8, lg: 4 }} // Add gap between columns
        maxWidth="container.xl"
        mx="auto"
      >
        {/* Left Column: HeadshotPro */}
        <Box
          flex="1"
          p={6}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="lg"
          bg="gray.50"
          w="100%"
        >
          <Heading size="lg" mb={4} textAlign="center">
            Mit Kibewerbungsfotos.de
          </Heading>
          <Divider mb={5} />
          {/* <Image
            src="/placeholder-gantt-1.png" // Replace with actual image path
            alt="HeadshotPro Prozess" // Translated alt text
            mb={6}
            borderRadius="md"
            boxShadow="sm"
            fallbackSrc="https://via.placeholder.com/400x200?text=HeadshotPro+Prozess" // Placeholder
          /> */}
          <List spacing={3}>
            <NumberedListItem
              number="1"
              title="Laden Sie Ihre Fotos hoch (5 Minuten)" // Translated title
              description="Verwenden Sie Ihre liebsten vorhandenen Fotos oder machen Sie spontan neue Selfies." // Translated description
            />
            <NumberedListItem
              number="2"
              title="Lassen Sie unsere KI ihre Magie wirken (1-2 Stunden)" // Translated title
              description="Unsere KI extrahiert Ihre fotogensten Eigenschaften aus den hochgeladenen Fotos." // Translated description
            />
            <NumberedListItem
              number="3"
              title="Laden Sie Ihre Favoriten herunter (5 Minuten)" // Translated title
              description="Das war einfach! Laden Sie Ihre Favoriten herunter und genießen Sie Ihre neuen professionellen Fotos." // Translated description
            />
          </List>
          <Text
            fontWeight="bold"
            color="green.500"
            mt={6}
            textAlign="center"
            fontStyle="italic"
          >
            Ergebnisse am selben Tag!
          </Text>
        </Box>

        {/* VS Separator */}
        <Box
          display={{ base: "none", lg: "block" }} // Hide on mobile, show on large screens
          fontWeight="bold"
          fontSize="2xl"
          color="gray.500"
          mx={4} // Add some margin
        >
          VS
        </Box>

        {/* Right Column: Physical Photoshoot */}
        <Box
          flex="1"
          p={6}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="lg"
          bg="gray.50"
          w="100%"
        >
          <Heading size="lg" mb={4} textAlign="center">
            Physisches Fotoshooting
          </Heading>
          {/* <Image
            src="/placeholder-gantt-2.png" // Replace with actual image path
            alt="Physisches Fotoshooting Prozess" // Translated alt text
            mb={6}
            borderRadius="md"
            boxShadow="sm"
            fallbackSrc="https://via.placeholder.com/400x200?text=Physisches+Fotoshooting" // Placeholder
          /> */}
          <Divider mb={5} />
          <List spacing={1}>
            <FeatureListItem icon={CloseIcon} iconColor="red.500">
              Finden Sie einen Fotografen, der Ihnen gefällt
            </FeatureListItem>
            <FeatureListItem icon={CloseIcon} iconColor="red.500">
              Kontaktieren Sie ihn und warten Sie auf eine Antwort
            </FeatureListItem>
            <FeatureListItem icon={CloseIcon} iconColor="red.500">
              Vereinbaren Sie ein Datum und eine Uhrzeit, zu der Sie beide
              verfügbar sind
            </FeatureListItem>
            <FeatureListItem icon={CloseIcon} iconColor="red.500">
              Finden Sie die richtige Kleidung für das Fotoshooting
            </FeatureListItem>
            <FeatureListItem icon={CloseIcon} iconColor="red.500">
              Fahren Sie mit dem Auto zum Fotostudio
            </FeatureListItem>
            <FeatureListItem icon={CloseIcon} iconColor="red.500">
              Posen Sie für Ihre Fotos und wählen Sie Ihre Lieblingsaufnahmen
              aus
            </FeatureListItem>
            <FeatureListItem icon={CloseIcon} iconColor="red.500">
              Warten Sie, bis der Fotograf Ihnen die Fotos schickt
            </FeatureListItem>
            <FeatureListItem icon={CloseIcon} iconColor="red.500">
              Aktualisieren Sie Ihre beruflichen Profile mit Ihren neuen Fotos
            </FeatureListItem>
          </List>
        </Box>
      </Flex>

      {/* Bottom CTA Button */}
      <Center mt={{ base: 8, md: 12 }}>
        <Button
          as={Link}
          href="/login" // Adjust link as needed
          variant="brand" // Use your brand variant from theme
          size="md"
          shadow="xl"
          rightIcon={<HiArrowRight />}
        >
          Erstellen Sie Ihre KI-Bewerbungsfotos
        </Button>
      </Center>
    </Box>
  );
}

export default Vergleichen;
