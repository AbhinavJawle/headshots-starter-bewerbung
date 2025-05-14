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
    <Box p={3} shadow="sm" borderWidth="1px" borderRadius="md" bg="gray.50">
      <Text fontSize="md" fontWeight="semibold" mb={2}>
        Wichtige Foto-Hinweise
      </Text>
      <Text fontSize="sm" mb={3}>
        Beachten Sie diese Tipps für beste Ergebnisse:
      </Text>

      <List spacing={1} mb={3} fontSize="sm">
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" boxSize={3} />
          Variieren Sie Fotos (keine Serien!)
        </ListItem>
        <ListItem>
          <ListIcon as={CheckIcon} color="green.500" boxSize={3} />
          Unterschiedliche Kleidung & Hintergründe
        </ListItem>
      </List>

      <SimpleGrid columns={2} spacing={4} mb={3} fontSize="sm">
        <Box>
          <Text fontWeight="semibold" color="green.500" mb={1} fontSize="sm">
            Ideal
          </Text>
          <List spacing={0.5}>
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
          <Text fontWeight="semibold" color="red.500" mb={1} fontSize="sm">
            Vermeiden
          </Text>
          <List spacing={0.5}>
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

      <Text fontWeight="semibold" mb={1} fontSize="sm">
        Beispiele:
      </Text>
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={2} mb={2}>
        {goodExamples.slice(0, 2).map((src, index) => (
          <Image
            key={`good-${index}`}
            src={src}
            alt={`Gutes Beispiel ${index + 1}`}
            borderRadius="sm"
            objectFit="cover"
            height="60px"
          />
        ))}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 2, md: 2 }} spacing={2}>
        {badExamples.slice(0, 2).map((src, index) => (
          <Image
            key={`bad-${index}`}
            src={src}
            alt={`Schlechtes Beispiel ${index + 1}`}
            borderRadius="sm"
            objectFit="cover"
            height="60px"
          />
        ))}
      </SimpleGrid>
    </Box>
  );

  if (displayType === "accordion") {
    return (
      <Accordion allowToggle defaultIndex={[0]}>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "gray.100" }} py={2}>
              <Box
                flex="1"
                textAlign="left"
                fontWeight="semibold"
                fontSize="sm"
              >
                Wichtige Foto-Hinweise
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={3}>{content}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }

  return content;
};

export default Information;
