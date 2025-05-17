"use client";

import { Box, Button, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import CookieConsent from "react-cookie-consent";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Akzeptieren"
      declineButtonText="Ablehnen"
      enableDeclineButton
      cookieName="kiBewerbungsfotosCookieConsent"
      expires={150} // Cookie expires after 150 days
      onAccept={() => {
        console.log("Cookies accepted by user.");
      }}
      onDecline={() => {
        console.log("Cookies declined by user.");
      }}
      // Chakra UI styling will be applied via style prop and component props
      style={{
        background: "rgba(45, 55, 72, 0.8)", // gray.800 with 80% opacity
        color: "white",
        padding: "1rem",
        fontSize: "14px",
        zIndex: 50,
        position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
      }}
      buttonStyle={{
        background: "#3dacec", // brand.500
        color: "white",
        fontWeight: "bold",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem", // md
        fontSize: "12px",
        margin: "0.5rem 0.5rem 0.5rem 0",
      }}
      declineButtonStyle={{
        background: "#E53E3E", // red.500
        color: "white",
        fontWeight: "bold",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem", // md
        fontSize: "12px",
        margin: "0.5rem",
      }}
      contentStyle={{
        margin: "0",
        flexGrow: 1,
      }}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Text mb={{ base: 2, sm: 0 }} mr={{ base: 0, sm: 4 }}>
          Diese Webseite verwendet Cookies, um die Benutzererfahrung zu
          verbessern. Weitere Informationen finden Sie in unserer{" "}
          <ChakraLink
            as={NextLink}
            href="/privacy"
            color="brand.300"
            _hover={{ color: "brand.400", textDecoration: "underline" }}
          >
            Datenschutzerklärung
          </ChakraLink>
          .
        </Text>
      </Flex>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
