"use client";

import { Flex, Heading, Slider, Text } from "@chakra-ui/react";
import Features from "./Features";
import Hero from "./Hero";
import Pricing from "./Pricing";
import FaqPage from "./FaqPage";
import Beispielen from "./Beispielen";
import Bewerbungsfotosehen from "./Bewerbungsfotosehen";
import Vergleichen from "./Vergleichen";
import { Box } from "@chakra-ui/react";
import EndCTA from "./EndCTA";
const HomePage = () => (
  <>
    <Flex flexDirection="column" flex="1">
      <Hero />
    </Flex>
    <Slider />
    <Beispielen />
    <Box
      mb={5}
      as="h3"
      // Removed maxWidth="rem" as it seemed incomplete/incorrect
      lineHeight={{ base: "1.1rem", sm: "1.1rem" }}
      fontSize={{ base: "0.8rem", sm: "1.1rem" }}
      fontWeight="normal"
      marginX={{ base: 5, sm: 16 }}
      textAlign="center"
      mt={5}
      // marginLeft={{ base: 5 }}
    >
      <b>1800+</b> AI Bewerbungsfotos für über <b>600+</b> zufriedene Kunden
      gemacht
    </Box>
    <Features />
    <Bewerbungsfotosehen />
    <Vergleichen />
    <Flex px={4} pt={10} maxWidth="container.lg" width="100%" marginX="auto">
      <Pricing />
    </Flex>
    <FaqPage />
    <EndCTA />
  </>
);

export default HomePage;
