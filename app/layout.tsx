import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/homepage/theme-provider";
import { validateConfig } from "@/lib/config";
import Providers from "@/components/Providers";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsentBanner from "@/components/CookieConsentBanner"; // Added import
import { Metadata, Viewport } from "next";

// Validate configuration at app initialization
// validateConfig();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

const siteUrl =
  process.env.DEPLOYMENT_URL || "https://www.kibewerbungsfotos.de";

// Utility function to generate canonical URLs
export function getCanonicalUrl(path: string = "") {
  // Remove trailing slash from siteUrl and leading slash from path
  const cleanPath = path.replace(/^\/+/, "");
  return `${siteUrl.replace(/\/+$/, "")}/${cleanPath}`;
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KI Bewerbungsfotos",
    template: "%s | KI Bewerbungsfotos Online",
  },
  description:
    "Erstellen Sie moderne und professionelle KI Bewerbungsfotos in Minuten. Perfekt für Ihre Bewerbung – einfach, schnell und kostengünstig.",
  keywords: [
    "bewerbungsfoto",
    "bewerbungsfotos",
    "ki bewerbungsfoto",
    "bewerbungsfoto selber machen",
    "bewerbungsfoto modern",
    "professionelle bewerbungsfotos",
    "online bewerbungsfoto erstellen",
    "bewerbungsfoto app",
    "bewerbungsfoto hintergrund",
    "bewerbungsbilder KI",
    "headshots KI",
    "DACH bewerbungsfoto",
    "bewerbungsbilder",
    "bewerbungsbild",
    "bewerbungsbild frau",
    "bewerbungsbild hintergrund",
    "bewerbungsbild selber machen",
    "bewerbungsbild selbst machen",
    "bewerbungsbild größe",
    "bewerbungsbilder selber machen",
    "bewerbungsbilder selbst machen",
    "professionelle bewerbungsbilder",
    "bewerbungsbild ki",
    "bewerbungsbilder ki",
    "ki bewerbungsbild",
    "ki bewerbungsbilder",
    "bewerbungsbild mit ki erstellen",
  ],
  authors: [{ name: "KIBewerbungsfotos", url: siteUrl }],
  creator: "KIBewerbungsfotos",
  publisher: "KIBewerbungsfotos",
  alternates: {
    canonical: getCanonicalUrl(),
    languages: {
      "de-DE": getCanonicalUrl(),
    },
  },
  openGraph: {
    title: "Professionelle KI Bewerbungsfotos Online Erstellen",
    description:
      "Moderne KI Bewerbungsfotos für den perfekten ersten Eindruck. Schnell, einfach und überzeugend – Ihre Lösung für Top-Bewerbungsbilder.",
    url: siteUrl,
    siteName: "KI Bewerbungsfotos Profi",
    // images: [
    //   {
    //     url: '/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'KI generierte Bewerbungsfotos für professionelle Bewerbungen',
    //   },
    // ],
    locale: "de_DE",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Top KI Bewerbungsfotos | Schnell & Professionell Online Erstellen",
  //   description:
  //     "Erstellen Sie beeindruckende KI Bewerbungsfotos für Ihre Bewerbung. Modern, einfach und direkt online verfügbar.",
  //   images: ["/og-image.png"],
  //   // creator: '@IhrTwitterHandle',
  // },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/favicon.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <Providers>{children}</Providers>
        <Toaster />
        <SpeedInsights />
        <Analytics />
        <CookieConsentBanner /> {/* Added CookieConsentBanner component */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
