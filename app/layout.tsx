import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/homepage/theme-provider";
import { validateConfig } from "@/lib/config";
import Providers from "@/components/Providers";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";

// Validate configuration at app initialization
validateConfig();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

const siteUrl = process.env.DEPLOYMENT_URL || "https://your-domain.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "KI Bewerbungsfotos Erstellen | Professionelle Bewerbungsbilder Online",
    template: "%s | KI Bewerbungsfotos Online",
  },
  description:
    "Erstellen Sie moderne und professionelle KI Bewerbungsfotos in Minuten. Perfekt für Ihre Bewerbung – einfach, schnell und kostengünstig. Testen Sie es jetzt!",
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
  ],
  authors: [{ name: "Ihr Firmenname", url: siteUrl }],
  creator: "Ihr Firmenname",
  publisher: "Ihr Firmenname",
  alternates: {
    canonical: "/",
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
  // icons: {
  //   icon: "/favicon.png",
  //   shortcut: "/favicon.png",
  //   apple: "/apple-touch-icon.png",
  // },
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
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
