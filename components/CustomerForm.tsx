/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, EmailIcon, InfoOutlineIcon, InfoIcon } from "@chakra-ui/icons";
import * as z from "zod";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { CountrySelect } from "@/components/ui/CountrySelector/CountrySelect"; 
import { User } from "@supabase/auth-helpers-nextjs";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(2, "Country is required"),
  addressLine: z.string().min(1, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  state: z.string().min(1, "State/Province is required"),
});

type CustomerFormData = z.infer<typeof formSchema>;

const CustomerPaymentForm = ({ user }: { user: User | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "DE", 
      firstName: "",
      lastName: "",
      email: user?.email || "",
      addressLine: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const createPaymentLink = async (formData: CustomerFormData) => {
    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Payment link creation failed");
      }

      const data = await response.json();
      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        throw new Error("Payment link not received");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Payment Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Payment error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CustomerFormData) => {
    setIsLoading(true);
    setError("");
    await createPaymentLink(data);
  };

  const handlePrefill = () => {
    setValue("firstName", "John");
    setValue("lastName", "Doe");
    setValue("email", "john.doe@example.com");
    setValue("country", "US");
    setValue("addressLine", "364 Kent St");
    setValue("city", "Sydney");
    setValue("state", "NSW");
    setValue("zipCode", "2035");
  };

  return (
    <Box
      w={{ base: "full", md: "70%", lg: "50%" }}
      p={{ base: 4, md: 8 }}
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      shadow="lg"
      bg="white"
      mt={8}
    >
      <Heading
        as="h2"
        size="lg"
        fontWeight="semibold"
        mb={6}
        textAlign="center"
      >
        Checkout-Informationen
      </Heading>

      {error && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={6}
        align="stretch"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <FormControl isInvalid={!!errors.firstName} id="firstName">
                <FormLabel>
                  Vorname{" "}
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <InfoOutlineIcon color="gray.300" />
                  </InputLeftElement>
                  <Input {...field} placeholder="z.B: Max" />
                </InputGroup>
                <FormErrorMessage>
                  {errors.firstName?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormControl isInvalid={!!errors.lastName} id="lastName">
                <FormLabel>
                  Nachname{" "}
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <InfoOutlineIcon color="gray.300" />
                  </InputLeftElement>
                  <Input {...field} placeholder="z.B: Mustermann" />
                </InputGroup>
                <FormErrorMessage>
                  {errors.lastName?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        </SimpleGrid>

        <Controller
          name="email"
          control={control}
          render={({ field }) =>
            !user?.email ? (
              <FormControl isInvalid={!!errors.email} id="email">
                <FormLabel>
                  Email Adresse{" "}
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    {...field}
                    type="email"
                    placeholder="z.B: max.mustermann@example.com"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
            ) : (
              <FormControl id="email-display">
                <FormLabel>Email Adresse</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    value={user.email}
                    type="email"
                    placeholder="z.B: johndoe@example.com"
                    readOnly
                    className="cursor-not-allowed"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
            )
          }
        />
        <VStack spacing={4} align="stretch">
          <Heading as="h3" size="md" fontWeight="medium" mt={2}>
            Rechnungsadresse
          </Heading>

          <FormControl isInvalid={!!errors.country} id="country">
            <FormLabel>
              <HStack spacing={2} align="center">
                <InfoOutlineIcon color="gray.500" /> 
                <Text>Land</Text>
                <Text as="span" color="red.500">
                  *
                </Text>
              </HStack>
            </FormLabel>
            <CountrySelect
              control={control}
              name="country"
              label=""
              placeholder="Please select a country"
              required
            />
            <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
          </FormControl>

          <Controller
            name="addressLine"
            control={control}
            render={({ field }) => (
              <FormControl isInvalid={!!errors.addressLine} id="addressLine">
                <FormLabel>
                  Adresse{" "} 
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <InfoIcon color="gray.300" />
                  </InputLeftElement>
                  <Input {...field} placeholder="z.B: Musterstraße 123" />
                </InputGroup>
                <FormErrorMessage>
                  {errors.addressLine?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.city} id="city">
                  <FormLabel>
                    Stadt{" "}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <InfoIcon color="gray.300" />
                    </InputLeftElement>
                    <Input {...field} placeholder="z.B: München" />
                  </InputGroup>
                  <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                </FormControl>
              )}
            />

            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.state} id="state">
                  <FormLabel>
                    Bundesland / Kanton{" "}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <InfoIcon color="gray.300" />
                    </InputLeftElement>
                    <Input {...field} placeholder="z.B: Bayern" />
                  </InputGroup>
                  <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
                </FormControl>
              )}
            />

            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.zipCode} id="zipCode">
                  <FormLabel>
                    PLZ{" "}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <InfoIcon color="gray.300" />
                    </InputLeftElement>
                    <Input {...field} placeholder="z.B: 80331" /> 
                  </InputGroup>
                  <FormErrorMessage>{errors.zipCode?.message}</FormErrorMessage>
                </FormControl>
              )}
            />
          </SimpleGrid>
        </VStack>
        <HStack spacing={4} justifyContent="center" mt={6}>
          <Button
            type="submit"
            variant="brand"
            isLoading={isLoading}
            loadingText="Processing..."
            w={{ base: "full", md: "auto" }}
            flexGrow={1}
          >
            Weiter zu Bezahlung
          </Button>
        </HStack>
        <p className="self-center">
          {" "}
          <LockIcon /> SSL-verschlüsselte Bezahlung
        </p>
      </VStack>
    </Box>
  );
};

export default CustomerPaymentForm;
