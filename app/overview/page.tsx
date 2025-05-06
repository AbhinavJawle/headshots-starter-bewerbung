import ClientSideModelsList from "@/components/realtime/ClientSideModelsList";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Box, Heading, Text, VStack, Container, Flex } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Flex
        justify="center"
        align="center"
        minHeight="70vh"
        direction="column"
        gap={4}
      >
        <Text fontSize="xl" color="red.500" fontWeight="medium">
          User not found
        </Text>
        <Text fontSize="md" color="gray.500">
          Please log in to view your models
        </Text>
      </Flex>
    );
  }

  const { data: models } = await supabase
    .from("models")
    .select(
      `*, samples (
      *
    )`
    )
    .eq("user_id", user.id);

  return (
    <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color="gray.800"
            mb={2}
          >
            Your Models
          </Heading>
          <Text color="gray.600">Manage and create new AI headshots</Text>
        </Box>

        <Box
          borderRadius="xl"
          overflow="hidden"
          bg="white"
          boxShadow="md"
          borderWidth="1px"
          borderColor="gray.200"
          p={{ base: 2, md: 4 }}
        >
          <ClientSideModelsList serverModels={models ?? []} />
        </Box>
      </VStack>
    </Container>
  );
}
