import { Box, Heading, Text, VStack, Image } from "@chakra-ui/react";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getPostSlugs().map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
  return slugs;
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

  return (
    <Box maxW="2xl" mx="auto" py={12} px={4}>
      <VStack
        align="start"
        spacing={4}
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="md"
      >
        {post.meta.coverImage && (
          <Image
            src={post.meta.coverImage}
            alt={post.meta.title}
            borderRadius="lg"
            mb={4}
            w="100%"
            maxH="320px"
            objectFit="cover"
            objectPosition="top center"
          />
        )}
        <Heading as="h1" size="xl" fontWeight="extrabold" color="brand.700">
          {post.meta.title}
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={2}>
          {post.meta.date}
        </Text>
        <Box
          className="prose"
          w="100%"
          color="gray.800"
          fontSize="md"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </VStack>
    </Box>
  );
}
