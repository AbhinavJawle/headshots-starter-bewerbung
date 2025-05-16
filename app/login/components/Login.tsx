"use client";

import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Input,
  Divider,
  HStack,
  useToast,
  Center,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import disposableDomains from "disposable-email-domains";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { WaitingForMagicLink } from "./WaitingForMagicLink";
import Link from "next/link";

type Inputs = {
  email: string;
};

// Google logo with original colors
const GoogleLogo = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <g>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </g>
  </Icon>
);

export const Login = ({
  host,
  searchParams,
}: {
  host: string | null;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const supabase = createClientComponentClient<Database>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      await signInWithMagicLink(data.email);
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Email gesendet",
          description: "Überprüfen Sie Ihre E-Mails, um fortzufahren.",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        setIsMagicLinkSent(true);
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Etwas ist schief gelaufen",
        description:
          "Bitte versuchen Sie es erneut, wenn das Problem weiterhin besteht, kontaktieren Sie uns bitte unter hello@tryleap.ai",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  let inviteToken = null;
  if (searchParams && "inviteToken" in searchParams) {
    inviteToken = searchParams["inviteToken"];
  }

  const protocol = host?.includes("localhost") ? "http" : "https";
  const redirectUrl = `${protocol}://${host}/auth/callback`;

  console.log({ redirectUrl });

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });

    console.log(data, error);
  };

  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  if (isMagicLinkSent) {
    return (
      <WaitingForMagicLink toggleState={() => setIsMagicLinkSent(false)} />
    );
  }

  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, blue.900, purple.900)"
  );

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("brand.500", "brand.400");
  const BASE_URL = process.env.DEPLOYMENT_URL;
  return (
    <Center minH="calc(100vh - 73px)" bg={bgGradient} px={{ base: 4, md: 0 }}>
      <VStack
        spacing={{ base: 4, md: 6 }}
        bg={cardBg}
        border="1px"
        borderColor={borderColor}
        p={{ base: 6, md: 8 }}
        borderRadius="xl"
        maxW="sm"
        w="full"
        boxShadow="xl"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: "-2px",
          left: "-2px",
          right: "-2px",
          bottom: "-2px",
          background: "linear-gradient(45deg, #3dacec, #7DFFBC)",
          zIndex: "-1",
          borderRadius: "xl",
          opacity: "0.5",
        }}
      >
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color="brand.500"
        >
          Registrieren/Einloggen
        </Text>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          textAlign="center"
          color="gray.500"
        >
          Registrieren Sie sich, um loszulegen.
        </Text>
        <Button
          onClick={signInWithGoogle}
          variant="outline"
          w="full"
          fontWeight="semibold"
          leftIcon={<GoogleLogo boxSize={{ base: 4, md: 5 }} />}
          borderWidth="2px"
          borderColor="gray.200"
          _hover={{
            bg: "gray.50",
            borderColor: "gray.300",
            transform: "translateY(-2px)",
            boxShadow: "md",
          }}
          transition="all 0.2s"
          height={{ base: "40px", md: "48px" }}
          fontSize={{ base: "sm", md: "md" }}
        >
          Mit Google anmelden
        </Button>
        <OR />

        <Box as="form" onSubmit={handleSubmit(onSubmit)} w="full">
          <VStack spacing={4} w="full">
            <VStack spacing={2} w="full" align="start">
              <Input
                type="email"
                placeholder="email@beispiel.com"
                borderColor="gray.300"
                _hover={{ borderColor: "brand.500" }}
                _focus={{
                  borderColor: "brand.500",
                  boxShadow: "0 0 0 1px #3dacec",
                }}
                height={{ base: "40px", md: "48px" }}
                fontSize={{ base: "sm", md: "md" }}
                {...register("email", {
                  required: true,
                  validate: {
                    emailIsValid: (value: string) =>
                      /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                      "Bitte geben Sie eine gültige E-Mail-Adresse ein",
                    emailDoesntHavePlus: (value: string) =>
                      /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                      "E-Mail-Adressen mit einem '+' sind nicht erlaubt",
                    emailIsntDisposable: (value: string) =>
                      !disposableDomains.includes(value.split("@")[1]) ||
                      "Bitte verwenden Sie eine dauerhafte E-Mail-Adresse",
                  },
                })}
              />
              {isSubmitted && errors.email && (
                <Text fontSize={{ base: "2xs", md: "xs" }} color="red.400">
                  {errors.email?.message || "Email ist erforderlich"}
                </Text>
              )}
            </VStack>

            <Button
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
              bg="brand.500"
              color="white"
              w="full"
              type="submit"
              _hover={{
                bg: "brand.600",
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
              transition="all 0.2s"
              height={{ base: "40px", md: "48px" }}
              fontSize={{ base: "sm", md: "md" }}
            >
              Registrieren
            </Button>
            <Text mt={8} fontSize={{ base: "xs", md: "xs" }} color="gray.500">
              Mit Ihrer Registrierung stimmen Sie den{" "}
              <Link
                href={`${BASE_URL}/terms`}
                target="_blank"
                rel="noopener noreferrer"
                color="brand.500"
                style={{ textDecoration: "underline" }}
              >
                Nutzungsbedingungen
              </Link>{" "}
              von kibewerbungsfotos.de zu.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Center>
  );
};

export const OR = () => {
  return (
    <HStack w="full" my={2}>
      <Divider flex="1" borderColor="gray.300" />
      <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" px={3}>
        ODER
      </Text>
      <Divider flex="1" borderColor="gray.300" />
    </HStack>
  );
};
