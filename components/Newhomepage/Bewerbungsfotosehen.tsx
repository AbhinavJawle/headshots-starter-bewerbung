import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Button,
  Flex,
  VStack,
  Badge, // Import Badge
} from "@chakra-ui/react";
import Link from "next/link";
import NextImage from "next/image"; // Added next/image
import { HiArrowRight } from "react-icons/hi";

// Use the same list of images as in Beispielen.tsx
const imageFiles = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
];

// Function to shuffle array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;
  const newArray = [...array];
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
}

// Select the first 15 images after shuffling
const imagesToShow = shuffleArray(imageFiles).slice(0, 15); // Changed back to 15

function Bewerbungsfotosehen() {
  return (
    <VStack textAlign={"center"}>
      <Box py={12} px={4}>
        <Heading
          as="h2"
          size="xl"
          fontWeight="extrabold"
          mb={8}
          lineHeight={{ base: "2rem", sm: "3rem" }}
        >
          So könnten Ihre Bewerbungsfotos aussehen
        </Heading>
        <Button
          as={Link}
          href="/#pricing"
          px={8}
          py={4}
          variant="brand" // Use your brand variant from theme
          size="md"
          shadow="xl"
          rightIcon={<HiArrowRight />}
          mb={3}
        >
          Nur für €10
        </Button>
        <Box
          mb={8}
          mt={3}
          as="h3"
          // Removed maxWidth="rem" as it seemed incomplete/incorrect
          lineHeight={{ base: "0.9rem", sm: "1.1rem" }}
          fontSize={{ base: "0.8rem", sm: "0.8rem" }}
          fontWeight="grey"
          marginX="auto" // Added marginX="auto" for good measure, though parent textAlign should handle it
        >
          Die durchschnittlichen Kosten für professionelle Fotos <br />
          in Deutschland kostet{" "}
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
            €270
          </Link>
        </Box>

        {/* Wrap Button in Flex for centering */}

        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg: 5 }} // Responsive columns
          spacing={{ base: 3, md: 4 }} // Responsive spacing
          maxWidth="container.xl"
          mx="auto"
        >
          {imagesToShow.map((img, index) => (
            <Box
              key={index}
              position="relative" // Ensure parent is relative for absolute positioning
              overflow="hidden"
              borderRadius="lg"
              boxShadow="md"
              // Aspect ratio box to maintain space before image loads with layout='fill'
              // You can adjust the paddingBottom percentage to match your desired aspect ratio e.g., 100% for 1:1, 75% for 4:3
              // For square images, as headshots often are, 100% is good.
              pb="100%" // This creates a square box for the image to fill
              display={index === 14 ? { base: "none", lg: "block" } : "block"}
              _hover={{
                boxShadow: "lg",
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
                zIndex: 1,
              }}
            >
              <NextImage
                src={`/headshots/${img}`}
                alt={`Beispiel KI Bewerbungsfoto ${index + 1}`}
                layout="fill"
                objectFit="cover"
                sizes="(min-width: 992px) 20vw, (min-width: 768px) 25vw, (min-width: 480px) 33vw, 50vw"
              />
              {/* KI Tag */}
              <Badge
                position="absolute"
                bottom="2" // Adjust spacing from bottom
                right="2" // Adjust spacing from right
                variant="solid" // Use solid variant for background
                colorScheme="brand" // Use brand color scheme
                fontSize="xx-small" // Make text very small
                px={1.5} // Horizontal padding
                py={0.5} // Vertical padding
                borderRadius="md" // Rounded corners
              >
                KI generiert
              </Badge>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
}

export default Bewerbungsfotosehen;
