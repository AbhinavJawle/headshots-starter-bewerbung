"use client";

import { Box, chakra, Container, Stack, Text } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { ReactNode } from "react";
import { MdAlternateEmail } from "react-icons/md";
import Link from "next/link";

const SocialButton = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <chakra.button
      href={href}
      as="a"
      bg="blackAlpha.100"
      rounded="full"
      w={8}
      h={8}
      target="_blank"
      cursor="pointer"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: "blackAlpha.400",
      }}
    >
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box mt="auto" pt={8} pb={6}>
      {" "}
      {/* Added more padding top and bottom */}
      <Container
        as={Stack}
        maxWidth="container.xl" // Slightly wider container for a more spacious feel
        py={4}
        spacing={4} // Reduced spacing between main sections
        justify="center"
        align="center"
      >
        <Stack
          direction={{ base: "column", sm: "row" }} // Column on extra small, row on small and up
          spacing={{ base: 4, sm: 6 }} // Adjust spacing for different screen sizes
          align="center"
          justify="center"
          wrap="wrap" // Allow items to wrap
          textAlign={{ base: "center", sm: "left" }} // Center text on mobile
        >
          <Text fontSize="sm" _hover={{ textDecoration: "underline" }}>
            <Link href="/terms">Nutzungsbedingungen</Link>
          </Text>
          <Text fontSize="sm" _hover={{ textDecoration: "underline" }}>
            <Link href="/privacy">Datenschutz</Link>
          </Text>
          <Text fontSize="sm" _hover={{ textDecoration: "underline" }}>
            <Link href="/refund">Rückerstattungsrichtlinie</Link>
          </Text>
          <Text fontSize="sm" _hover={{ textDecoration: "underline" }}>
            <Link href="/faq">FAQ</Link>
          </Text>
          <SocialButton href="mailto:abhinav@kibewerbungsfotos.de">
            <MdAlternateEmail />
          </SocialButton>
        </Stack>

        <Text
          pt={{ base: 4, sm: 2 }} // Add some padding top on mobile for the brand name
          fontSize={{ base: "md", sm: "lg" }} // Responsive font size
          fontWeight="bold"
          textAlign="center"
        >
          KIBewerbungsfotos
        </Text>

        <Text fontSize="xs" color="gray.500" textAlign="center" pt={4}>
          © {new Date().getFullYear()} KIBewerbungsfotos.de - Alle Rechte
          vorbehalten
        </Text>
      </Container>
    </Box>
  );
}
