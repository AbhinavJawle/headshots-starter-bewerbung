"use client";

import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const goodExamples = [
  "/good_results.png", // Placeholder - replace with actual image paths
  "/example.png",
  "/example1.png",
  "/example2.png",
];

const badExamples = [
  "/multiple_faces.png", // Placeholder - replace with actual image paths
  "/pet.png",
  "/blur.png",
  "/anime.png",
];

const Information = () => {
  const displayType = useBreakpointValue({ base: "accordion", md: "static" });

  const content = (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="lg" bg="gray.50">
      <Text fontSize="lg" fontWeight="semibold" mb={3}>
        Wichtige Foto-Hinweise
      </Text>
      <Text fontSize="sm" mb={4}>
        Beachten Sie diese Tipps für beste Ergebnisse:
      </Text>

      <List spacing={2} mb={4} fontSize="sm">
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" boxSize={3} />
          Variieren Sie Fotos (keine Serien!)
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" boxSize={3} />
          Unterschiedliche Kleidung & Hintergründe
        </ListItem>
      </List>

      <SimpleGrid columns={2} spacing={4} mb={4} fontSize="sm">
        <Box>
          <Text fontWeight="semibold" color="green.500" mb={2} fontSize="sm">
            Ideal
          </Text>
          <List spacing={1}>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.500" boxSize={3} />
              Klare Sicht aufs Gesicht
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.500" boxSize={3} />
              Nur eine Person
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="green.500" boxSize={3} />
              Gute Qualität & Winkel
            </ListItem>
          </List>
        </Box>
        <Box>
          <Text fontWeight="semibold" color="red.500" mb={2} fontSize="sm">
            Vermeiden
          </Text>
          <List spacing={1}>
            <ListItem>
              <ListIcon as={CloseIcon} color="red.500" boxSize={3} />
              Gesicht verdeckt/zu weit
            </ListItem>
            <ListItem>
              <ListIcon as={CloseIcon} color="red.500" boxSize={3} />
              Grimassen, schlechte Qualität
            </ListItem>
            <ListItem>
              <ListIcon as={CloseIcon} color="red.500" boxSize={3} />
              Accessoires (Brille, Hut)
            </ListItem>
          </List>
        </Box>
      </SimpleGrid>

      <Text fontWeight="semibold" mb={2} fontSize="sm">
        Beispiele:
      </Text>
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={3} mb={3}>
        {goodExamples.slice(0, 2).map((src, index) => (
          <Box key={`good-${index}`} position="relative">
            <Image
              src={src}
              alt={`Gutes Beispiel ${index + 1}`}
              borderRadius="md"
              objectFit="cover"
              height="70px"
              width="100%"
              shadow="sm"
            />
            <Box
              position="absolute"
              top={1}
              left={1}
              bg="green.500"
              color="white"
              fontSize="xs"
              fontWeight="bold"
              px={2}
              py={0.5}
              borderRadius="md"
              opacity={0.9}
            >
              Gut
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={3}>
        {badExamples.slice(0, 2).map((src, index) => (
          <Box key={`bad-${index}`} position="relative">
            <Image
              src={src}
              alt={`Schlechtes Beispiel ${index + 1}`}
              borderRadius="md"
              objectFit="cover"
              height="70px"
              width="100%"
              shadow="sm"
            />
            <Box
              position="absolute"
              top={1}
              left={1}
              bg="red.500"
              color="white"
              fontSize="xs"
              fontWeight="bold"
              px={2}
              py={0.5}
              borderRadius="md"
              opacity={0.9}
            >
              Schlecht
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );

  if (displayType === "accordion") {
    return (
      <Accordion allowToggle defaultIndex={[0]}>
        <AccordionItem
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          overflow="hidden"
        >
          <h2>
            <AccordionButton
              _expanded={{ bg: "blue.50", color: "blue.700" }}
              py={3}
              _hover={{ bg: "gray.100" }}
            >
              <Box
                flex="1"
                textAlign="left"
                fontWeight="semibold"
                fontSize="md"
              >
                Wichtige Foto-Hinweise
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{content}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }

  return content;
};

export default Information;
