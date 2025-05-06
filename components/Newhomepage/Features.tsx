import { Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

interface ItemProps {
  iconName: string;
  title: string;
  children: React.ReactNode;
}

const Item = ({ iconName, title, children }: ItemProps) => (
  <Flex alignItems="center" direction="column" p={{ base: 0.5, md: 2 }}>
    {" "}
    {/* Reduced md padding */}
    <Image
      alt="logo"
      width={{ base: "3.5rem", md: "6rem" }} // Reduced md width
      src={iconName}
    />
    <Text
      textAlign="center"
      fontWeight="900"
      fontSize={{ base: "sm", md: "xl" }} // Reduced md font size
      mt={{ base: 1, md: 2 }} // Reduced md margin top
    >
      {title}
    </Text>
    <Text
      maxWidth={{ base: "95%", md: "90%" }} // Adjusted md max width
      mt={{ base: 0.5, md: 1 }} // Reduced md margin top
      textAlign="center"
      fontSize={{ base: "xs", md: "md" }} // Reduced md font size
      lineHeight={{ base: 1.2, md: 1.3 }} // Adjusted md line height
    >
      {children}
    </Text>
  </Flex>
);

const Features = () => {
  return (
    <Flex
      width="100%"
      backgroundColor="whiteAlpha.900"
      py={{ base: 4, md: 6 }}
      flex="1"
    >
      {" "}
      {/* Reduced py */}
      <Flex
        px={{ base: 1, lg: 0 }}
        py={1} // Kept py low for inner container
        width="100%"
        flexDirection="column"
        margin="auto"
        maxWidth="container.lg"
      >
        <SimpleGrid
          mb={{ base: 4, md: 6 }} // Reduced mb
          columns={{ base: 3, md: 3 }}
          spacing={{ base: 0.5, md: 2 }} // Reduced md spacing
        >
          {" "}
          {/* Changed columns to 1 on base, added spacing */}
          <Item iconName="publish.svg" title="1. Hochladen">
            Laden Sie einige Selfies von Ihnen hoch
          </Item>
          <Item iconName="square.svg" title="2. Warten">
            Unsere KI wird Ihre Fotos in 20 Minuten verarbeiten
          </Item>
          <Item iconName="preview.svg" title="3. Herunterladen">
            Bewerbungsfoto wählen und herunterladen
          </Item>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Features;
