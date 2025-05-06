import {
  Box,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  Button,
  Icon,
  Tooltip,
  VStack, // Import VStack
  HStack, // Import HStack
} from "@chakra-ui/react";
import React from "react";
import { CheckIcon } from "@chakra-ui/icons"; // Import CheckIcon and QuestionOutlineIcon
import Link from "next/link"; // Import Link for buttons

// Keep CheckedListItem if used elsewhere, or integrate directly
export const CheckedListItem = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ListItem display="flex" alignItems="center">
    <ListIcon as={CheckIcon} color="green.500" mr={2} />
    <Text as="span" flex="1">
      {children}
    </Text>
  </ListItem>
);

// Define pricing data
const pricingPlans = [
  {
    name: "Basic",
    price: "€10",
    description: "Erhalten Sie 40 Headshots in 1 Stil.",
    features: [
      { text: "40 KI Bewerbungsfotos" },
      { text: "1 einzigartiger Stil" },
      { text: "20 Minuten Bearbeitungszeit" },
    ],
    buttonText: "Jetzt Erstellen",
    isFeatured: false,
  },
  {
    name: "Professionell",
    price: "€14.99",
    description: "Erhalten Sie 80 Headshots in 2 Stil.",
    features: [
      { text: "80 KI Bewerbungsfotos" },
      { text: "2 einzigartiger Stil" },
      { text: "20 Minuten Bearbeitungszeit" },
    ],
    buttonText: "Jetzt Erstellen",
    isFeatured: true,
  },
  {
    name: "Expert",
    price: "€19.99",
    description: "Erhalten Sie 120 Headshots in 3 Stil.",
    features: [
      { text: "120 KI Bewerbungsfotos" },
      { text: "3 einzigartiger Stil" },
      { text: "20 Minuten Bearbeitungszeit" },
    ],
    buttonText: "Jetzt Erstellen",
    isFeatured: false,
  },
];

const Pricing = () => {
  return (
    <div>
      <VStack
        className="color"
        alignItems={{ base: "center", sm: "center" }}
        spacing={10}
        justifyContent="center"
        flexDirection="column"
        id="pricing"
      >
        <Box textAlign={{ base: "center", sm: "center" }}>
          <Box
            mb={3}
            as="h2"
            // Removed maxWidth="rem" as it seemed incomplete/incorrect
            lineHeight={{ base: "2.3rem", sm: "3rem" }}
            fontSize={{ base: "2rem", sm: "2.6rem" }}
            fontWeight="black"
            marginX="auto" // Added marginX="auto" for good measure, though parent textAlign should handle it
          >
            Professionelle Bewerbungsfotos zu einem Bruchteil der Kosten
          </Box>
          <Box
            as="h3"
            maxWidth="50rem"
            fontSize={{ base: "xs", sm: "xl" }}
            lineHeight={{ base: "xl", sm: "2xl" }}
            marginX="auto" // Add this to center the h2 Box itself
          >
            Die durchschnittlichen Kosten für professionelle Fotos in
            Deutschland belaufen sich auf{" "}
            <Link
              href={
                "https://www.listando.de/content/was-kostet-ein-businessfotograf"
              }
              target={"_blank"}
              rel={"noopener noreferrer"}
              style={{
                textDecoration: "underline",
              }}
            >
              €185 zu €590 pro person.
            </Link>
            {""}
            <br />
            <b>Unsere Angebote starten bei €10</b>
          </Box>
        </Box>
      </VStack>

      <SimpleGrid
        width="100%"
        spacing={{ base: 4, md: 8 }}
        columns={{ base: 1, md: 3 }}
        py={10}
        px={{ base: 2, md: 4 }}
        maxWidth="container.xl" // Changed from container.xl to match parent
        mx="auto"
      >
        {pricingPlans.map((plan, index) => (
          <Box
            key={index}
            bg="white"
            borderWidth="1px"
            borderColor={plan.isFeatured ? "brand.500" : "gray.200"}
            borderRadius="xl"
            p={{ base: 4, md: 8 }} // Reverted md padding back to 8
            shadow={plan.isFeatured ? "xl" : "md"}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            transition="all 0.3s ease-in-out"
            _hover={{ shadow: "lg", transform: "translateY(-5px)" }}
          >
            <VStack spacing={{ base: 2, md: 4 }} align="stretch" flexGrow={1}>
              {" "}
              {/* Reduced base spacing */}
              <Text fontWeight="semibold" fontSize="lg" color="gray.600">
                {plan.name}
              </Text>
              <Text
                fontWeight="black"
                fontSize={{ base: "4xl", md: "5xl" }}
                lineHeight="1"
              >
                {" "}
                {/* Reduced base font size */}
                {plan.price}
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                minHeight={{ base: "auto", md: "3em" }}
              >
                {" "}
                {/* Adjusted minHeight for base */}
                {plan.description}
              </Text>
              <List spacing={{ base: 2, md: 3 }} pt={4}>
                {" "}
                {/* Reduced base spacing */}
                {plan.features.map((feature, fIndex) => (
                  <CheckedListItem key={fIndex}>{feature.text}</CheckedListItem>
                ))}
              </List>
            </VStack>
            <Button
              as={Link}
              href="/dashboard"
              mt={6}
              w="full"
              variant={plan.isFeatured ? "brand" : "outline"}
              colorScheme={plan.isFeatured ? undefined : "gray"}
              size={{ base: "md", md: "lg" }} // Make button size responsive
            >
              {plan.buttonText}
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Pricing;
