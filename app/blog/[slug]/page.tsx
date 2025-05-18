import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Container,
  Flex,
  useBreakpointValue,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HiArrowRight } from "react-icons/hi";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.coverImage ? [post.meta.coverImage] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.coverImage ? [post.meta.coverImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs().map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
  return slugs;
}

function getReadingTime(content: string) {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  if (!post) return notFound();

  const author = post.meta.author || "Team Kibewerbungsfotos";
  const readingTime = getReadingTime(post.contentHtml);

  return (
    <Container
      maxW={{ base: "100%", md: "3xl", lg: "4xl" }}
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 12 }}
    >
      <Box
        w="full"
        bg="white"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
      >
        {post.meta.coverImage && (
          <Box
            position="relative"
            w="full"
            h={{ base: "200px", md: "300px", lg: "400px" }}
          >
            <Image
              src={post.meta.coverImage}
              alt={post.meta.title}
              w="full"
              h="full"
              objectFit="cover"
              objectPosition="top center"
            />
          </Box>
        )}

        {/* Marketing Button below image */}
        <Flex justify="center" mt={-8} mb={6}>
          <Button
            as={ChakraLink}
            href="/"
            variant="brand"
            size="lg"
            shadow="xl"
            rightIcon={<HiArrowRight />}
            px={6}
            py={5}
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            _hover={{ bg: "brand.600" }}
          >
            Jetzt Bewerbungsfotos erstellen
          </Button>
        </Flex>

        <Box p={{ base: 4, md: 8 }}>
          <VStack align="flex-start" spacing={{ base: 3, md: 4 }}>
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              fontWeight="extrabold"
              color="gray.900"
              lineHeight="1.2"
            >
              {post.meta.title}
            </Heading>

            <Flex
              wrap="wrap"
              fontSize="sm"
              color="gray.500"
              gap={2}
              align="center"
            >
              <Text>{post.meta.date}</Text>
              <Text>•</Text>
              <Text>{readingTime}</Text>
              <Text>•</Text>
              <Text>By {author}</Text>
            </Flex>

            <Box
              className="prose"
              w="100%"
              color="gray.800"
              fontSize={{ base: "md", md: "lg" }}
              sx={{
                "h1, h2, h3, h4, h5, h6": {
                  fontWeight: "bold",
                  color: "gray.900",
                  mt: { base: 4, md: 6 },
                  mb: { base: 2, md: 3 },
                  lineHeight: "1.3",
                },
                h1: { fontSize: { base: "xl", md: "2xl" } },
                h2: { fontSize: { base: "lg", md: "xl" } },
                h3: { fontSize: { base: "md", md: "lg" } },
                p: { mb: 4, lineHeight: "1.7" },
                ul: { pl: 6, mb: 4 },
                ol: { pl: 6, mb: 4 },
                li: { mb: 2 },
                a: {
                  color: "gray.800",
                  textDecoration: "underline",
                  _hover: { color: "gray.700" },
                },
                blockquote: {
                  pl: 4,
                  borderLeft: "4px solid",
                  borderColor: "gray.200",
                  color: "gray.600",
                  fontStyle: "italic",
                  mb: 4,
                  py: 2,
                },
                code: {
                  bg: "gray.100",
                  px: 1,
                  borderRadius: "md",
                  fontSize: { base: "xs", md: "sm" },
                },
                pre: {
                  bg: "gray.100",
                  p: 3,
                  borderRadius: "md",
                  overflowX: "auto",
                  mb: 4,
                  w: "100%",
                },
                img: {
                  borderRadius: "md",
                  my: 4,
                  maxW: "100%",
                  h: "auto",
                  mx: "auto",
                  display: "block",
                },
                hr: { my: 8 },
                strong: { fontWeight: "bold" },
                table: {
                  width: "100%",
                  borderCollapse: "collapse",
                  my: 6,
                  fontSize: "sm",
                  overflowX: "auto",
                  display: { base: "block", md: "table" },
                },
                th: {
                  bg: "gray.100",
                  color: "gray.900",
                  fontWeight: "bold",
                  px: 3,
                  py: 2,
                  border: "1px solid",
                  borderColor: "gray.200",
                  textAlign: "left",
                },
                td: {
                  px: 3,
                  py: 2,
                  border: "1px solid",
                  borderColor: "gray.200",
                  whiteSpace: { base: "normal", md: "normal" },
                  wordBreak: "break-word",
                },
                tr: { _even: { bg: "gray.50" } },
              }}
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Marketing Button below post */}
            <Flex justify="center" w="full" mt={8}>
              <Button
                as={ChakraLink}
                href="/"
                variant="brand"
                size="lg"
                shadow="xl"
                rightIcon={<HiArrowRight />}
                px={6}
                py={5}
                fontWeight="bold"
                fontSize={{ base: "md", md: "lg" }}
                _hover={{ bg: "brand.600" }}
              >
                Jetzt Bewerbungsfotos erstellen
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
}
