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
  Collapse,
} from "@chakra-ui/react";
import { HiArrowRight } from "react-icons/hi";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

function getCanonicalUrl(slug: string) {
  const baseUrl = process.env.DEPLOYMENT_URL || "https://kibewerbungsfotos.de";
  return `${baseUrl}/blog/${slug}`;
}

function getArticleJsonLd(post: any, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    image: post.meta.coverImage ? [post.meta.coverImage] : [],
    author: {
      "@type": "Person",
      name: post.meta.author || "Team Kibewerbungsfotos",
    },
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(slug),
    },
  };
}

function extractFaqJsonLd(contentHtml: string) {
  // Simple regex to extract FAQ sections (Q: ... A: ...)
  const faqRegex = /<h2[^>]*>\s*FAQs?\s*<\/h2>([\s\S]*?)(<h2|<h3|<\/div|$)/i;
  const match = contentHtml.match(faqRegex);
  if (!match) return null;
  const faqBlock = match[1];
  const qaRegex = /<li[^>]*>\s*<strong>(.*?)<\/strong>\s*<br\/?>(.*?)<\/li>/g;
  const faqs = [];
  let qaMatch;
  while ((qaMatch = qaRegex.exec(faqBlock))) {
    faqs.push({
      question: qaMatch[1].replace(/\s+/g, " ").trim(),
      answer: qaMatch[2].replace(/\s+/g, " ").trim(),
    });
  }
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function extractToc(contentHtml: string) {
  // Extract h2/h3 headings for TOC
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h[23]>/g;
  const toc = [];
  let match;
  while ((match = headingRegex.exec(contentHtml))) {
    toc.push({
      level: parseInt(match[1]),
      text: match[2].replace(/<[^>]+>/g, ""),
      id: match[2]
        .replace(/<[^>]+>/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9äöüß]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    });
  }
  return toc;
}

function getCloudinaryTransformedUrl(url: string) {
  if (!url.includes("res.cloudinary.com")) return url;
  // Insert transformation string after '/upload/'
  return url.replace(
    /\/upload\//,
    "/upload/w_600,h_338,c_pad,g_center,e_sharpen:60,q_auto:good,dpr_2.0,f_auto,b_gen_fill/"
  );
}

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
    alternates: { canonical: getCanonicalUrl(params.slug) },
    robots: { index: true, follow: true },
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
  return `${minutes} min Lesezeit`;
}

// Dynamically import ExpandableToc as a client component
const ExpandableToc = dynamic(() => import("./ExpandableToc"), { ssr: true });

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
  const canonicalUrl = getCanonicalUrl(params.slug);
  const articleJsonLd = getArticleJsonLd(post, params.slug);
  const faqJsonLd = extractFaqJsonLd(post.contentHtml);
  const toc = extractToc(post.contentHtml);

  return (
    <Container
      as="article"
      maxW={{ base: "100%", md: "3xl", lg: "4xl" }}
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 12 }}
    >
      {/* SEO: JSON-LD Article structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* SEO: FAQPage JSON-LD if present */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* SEO: Canonical and robots meta tags (handled by metadata API) */}

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
              src={getCloudinaryTransformedUrl(post.meta.coverImage)}
              alt={post.meta.alt || post.meta.title || "Bewerbungsfoto"}
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
              <Text>Von {author}</Text>
            </Flex>

            {/* Table of Contents for long posts */}
            {toc.length > 4 && (
              <Box
                as="nav"
                aria-label="Inhaltsverzeichnis"
                mb={6}
                w="full"
                bg="white"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.200"
                boxShadow="sm"
                px={{ base: 3, md: 5 }}
                py={{ base: 3, md: 4 }}
              >
                <ExpandableToc toc={toc} />
              </Box>
            )}

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
                  scrollMarginTop: "100px",
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
