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
    <Box mt="auto">
      <Container
        as={Stack}
        maxWidth="container.lg"
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={6}
        justify="center"
        align="center"
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={4}
          justifyContent="center"
        >
          <Text fontSize="sm">
            <Link href="/terms">Nutzungsbedingungen</Link>
          </Text>
          <Text fontSize="sm">
            <Link href="/privacy">Datenschutz</Link>
          </Text>
          <Text fontSize="sm">
            <Link href="/refund">Rückerstattungsrichtlinie</Link>
          </Text>
          <Text fontSize="sm">
            <Link href="/faq">FAQ</Link>
          </Text>
          <SocialButton href="mailto:support@kibewerbungsfotos.de">
            <MdAlternateEmail />
          </SocialButton>
          <Text
            display={{ base: "none", sm: "block" }}
            fontSize="lg"
            fontWeight="bold"
          >
            KIBewerbungsfotos
          </Text>
        </Stack>
      </Container>
      <Box py={2} bg="transparent" mb={5} textAlign="center">
        <Text fontSize="sm">
          © 2025 bewerbungsbild.ai - Alle Rechte vorbehalten
        </Text>
      </Box>
    </Box>
  );
}
