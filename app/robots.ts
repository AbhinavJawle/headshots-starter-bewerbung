import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.DEPLOYMENT_URL || 'https://your-default-domain.com'; // Fallback needed if DEPLOYMENT_URL is not set at build time

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
