/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon } from "@chakra-ui/icons";
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
  SimpleGrid,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { CountrySelect } from "@/components/ui/CountrySelector/CountrySelect"; // Assuming this is Chakra-compatible or to be styled externally
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
      country: "DE", // Default to Germany as an example
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
        Checkout Information
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
                  First Name{" "}
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <Input {...field} placeholder="eg: John" />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormControl isInvalid={!!errors.lastName} id="lastName">
                <FormLabel>
                  Last Name{" "}
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <Input {...field} placeholder="eg: Doe" />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
            )}
          />
        </SimpleGrid>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormControl isInvalid={!!errors.email} id="email">
              <FormLabel>
                Email{" "}
                <Text as="span" color="red.500">
                  *
                </Text>
              </FormLabel>
              <Input
                {...field}
                type="email"
                placeholder="eg: johndoe@example.com"
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <VStack spacing={4} align="stretch">
          <Heading as="h3" size="md" fontWeight="medium" mt={2}>
            Billing Address
          </Heading>

          <FormControl isInvalid={!!errors.country} id="country">
            <FormLabel>
              Country{" "}
              <Text as="span" color="red.500">
                *
              </Text>
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
                  Street Address{" "}
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <Input {...field} placeholder="eg: 364 Kent St" />
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
                    City{" "}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </FormLabel>
                  <Input {...field} placeholder="eg: Sydney" />
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
                    State / Province{" "}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </FormLabel>
                  <Input {...field} placeholder="eg: NSW" />
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
                    Zip / Postal Code{" "}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </FormLabel>
                  <Input {...field} placeholder="eg: 2035" />
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
            Continue to Payment
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
