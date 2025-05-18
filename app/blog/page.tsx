import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { getAllPosts } from "@/lib/blog";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <Box maxW="7xl" mx="auto" py={12} px={{ base: 2, md: 6 }}>
      <Heading
        as="h1"
        size="2xl"
        fontWeight="extrabold"
        mb={10}
        color="brand.700"
        textAlign="center"
      >
        Blog
      </Heading>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={8}>
        {posts.map((post) => (
          <Box
            key={post.slug}
            p={0}
            borderWidth={1}
            borderRadius="xl"
            bg="white"
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{
              boxShadow: "lg",
              borderColor: "brand.400",
              transform: "translateY(-4px) scale(1.03)",
            }}
            display="flex"
            flexDirection="column"
            minH="320px"
            overflow="hidden"
          >
            {post.meta.coverImage && (
              <Image
                src={post.meta.coverImage}
                alt={post.meta.title}
                w="100%"
                h="160px"
                objectFit="cover"
                objectPosition="top center"
                borderTopRadius="xl"
                mb={0}
              />
            )}
            <Box p={6} flex="1" display="flex" flexDirection="column">
              <ChakraLink
                as={NextLink}
                href={`/blog/${post.slug}`}
                fontSize="xl"
                fontWeight="bold"
                color="brand.600"
                mb={2}
                _hover={{ color: "brand.700", textDecoration: "underline" }}
              >
                {post.meta.title}
              </ChakraLink>
              <Text fontSize="sm" color="gray.500" mb={2}>
                {post.meta.date}
              </Text>
              <Text color="gray.700" fontSize="md" mb={2} noOfLines={3}>
                {post.meta.description}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
