"use client";
import { Database } from "@/types/supabase";
import { modelRowWithSamples } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";
import ModelsTable from "../ModelsTable";
import { Button } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Container,
} from "@chakra-ui/react";
import { HiArrowRight } from "react-icons/hi";

// Initialize Supabase client outside the component
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export const revalidate = 0;

type ClientSideModelsListProps = {
  serverModels: modelRowWithSamples[] | [];
};

export default function ClientSideModelsList({
  serverModels,
}: ClientSideModelsListProps) {
  const [models, setModels] = useState<modelRowWithSamples[]>(serverModels);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-models")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "models" },
        (payload: any) => {
          const handlePayload = async () => {
            const samples = await supabase
              .from("samples")
              .select("*")
              .eq("modelId", payload.new.id);

            const newModel: modelRowWithSamples = {
              ...payload.new,
              samples: samples.data,
            };

            // It's safer to update state based on the previous state
            // to avoid issues with stale closures, especially with realtime updates.
            setModels((prevModels) => {
              const dedupedModels = prevModels.filter(
                (model) => model.id !== payload.old?.id
              );
              return [...dedupedModels, newModel];
            });
          };
          handlePayload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const bgGradient = useColorModeValue(
    "linear(to-br, white, gray.50)",
    "linear(to-br, gray.800, gray.900)"
  );

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box width="full" py={4}>
      {models && models.length > 0 && (
        <VStack spacing={6} align="stretch">
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md" color={headingColor}>
              Your AI Models
            </Heading>
            <Link
              href={
                packsIsEnabled
                  ? "/overview/stil"
                  : "/overview/models/train/raw-tune"
              }
            >
              <Button
                variant="brand"
                size="sm"
                shadow="xl"
                rightIcon={<HiArrowRight />}
              >
                Train New Model
              </Button>
            </Link>
          </Flex>

          <Box
            borderRadius="xl"
            overflow="hidden"
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{ boxShadow: "md" }}
          >
            <ModelsTable models={models} />
          </Box>
        </VStack>
      )}

      {models && models.length === 0 && (
        <Container maxW="container.md" py={16}>
          <VStack
            spacing={8}
            align="center"
            bg={cardBg}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            p={8}
            boxShadow="xl"
          >
            <Icon as={FaImages} boxSize={16} color="brand.500" opacity={0.8} />

            <VStack spacing={3}>
              <Heading size="lg" textAlign="center" color={headingColor}>
                Get Started with AI Headshots
              </Heading>
              <Text
                fontSize="md"
                textAlign="center"
                color={textColor}
                maxW="md"
              >
                Create your first AI model to generate professional headshots
                for your applications.
              </Text>
            </VStack>

            <Link
              href={
                packsIsEnabled
                  ? "/overview/stil"
                  : "/overview/models/train/raw-tune"
              }
            >
              <Button size="lg" variant={"brand"}>
                <HiArrowRight />
                Train Your First Model
              </Button>
            </Link>
          </VStack>
        </Container>
      )}
    </Box>
  );
}
