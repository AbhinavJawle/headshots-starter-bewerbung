import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  SimpleGrid,
  Image,
  Container,
  Flex,
  VStack,
  AspectRatio,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { getAllPosts } from "@/lib/blog";

function getCloudinaryTransformedUrl(url: string) {
  if (!url.includes("res.cloudinary.com")) return url;
  // Insert transformation string after '/upload/'
  return url.replace(
    /\/upload\//,
    "/upload/w_600,h_338,c_fill,g_auto,e_sharpen:60,q_auto:good,dpr_2.0,f_auto/"
  );
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <Container
      maxW={{ base: "100%", md: "container.lg", lg: "container.xl" }}
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 12 }}
    >
      <VStack
        spacing={{ base: 6, md: 10 }}
        width="full"
        mb={{ base: 8, md: 12 }}
      >
        <Heading
          as="h1"
          size={{ base: "xl", md: "2xl" }}
          fontWeight="extrabold"
          color="gray.900"
          textAlign="center"
        >
          Blog
        </Heading>
      </VStack>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 4, md: 6 }}
        width="full"
      >
        {posts.map((post) => (
          <Box
            key={post.slug}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="sm"
            transition="all 0.3s ease"
            _hover={{
              boxShadow: "md",
              transform: { base: "translateY(-2px)", md: "translateY(-4px)" },
              borderColor: "brand.400",
            }}
            display="flex"
            flexDirection="column"
            height="full"
          >
            {post.meta.coverImage && (
              <AspectRatio ratio={16 / 9} width="full">
                <Image
                  src={getCloudinaryTransformedUrl(post.meta.coverImage)}
                  alt={post.meta.title}
                  objectFit="cover"
                  objectPosition="center"
                  width="full"
                  height="full"
                />
              </AspectRatio>
            )}

            <Flex direction="column" flex="1" p={{ base: 4, md: 5 }}>
              <ChakraLink
                as={NextLink}
                href={`/blog/${post.slug}`}
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="bold"
                color="gray.900"
                mb={2}
                _hover={{ color: "gray.700", textDecoration: "underline" }}
                lineHeight="tight"
              >
                {post.meta.title}
              </ChakraLink>

              <Text fontSize="sm" color="gray.500" mb={2}>
                {post.meta.date}
              </Text>

              <Text
                color="gray.700"
                fontSize={{ base: "sm", md: "md" }}
                flex="1"
                noOfLines={3}
                lineHeight="tall"
              >
                {post.meta.description}
              </Text>

              <ChakraLink
                as={NextLink}
                href={`/blog/${post.slug}`}
                fontSize="sm"
                color="gray.700"
                fontWeight="medium"
                mt={3}
                _hover={{ color: "gray.900", textDecoration: "underline" }}
                alignSelf="flex-start"
              >
                Read more →
              </ChakraLink>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      {posts.length === 0 && (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.600">
            No blog posts available yet.
          </Text>
        </Box>
      )}
    </Container>
  );
}
