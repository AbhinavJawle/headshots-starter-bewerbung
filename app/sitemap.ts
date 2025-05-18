import { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const baseUrl = process.env.DEPLOYMENT_URL;

  // Get all blog post slugs
  const blogSlugs = getPostSlugs();
  const blogUrls = blogSlugs.map((slug) => {
    const cleanSlug = slug.replace(/\.md$/, "");
    return {
      url: `${baseUrl}/blog/${cleanSlug}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    };
  });

  return [
    {
      url: `${baseUrl}/`,
      lastModified: lastModified,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    // Add all blog post URLs
    ...blogUrls,
  ];
}
