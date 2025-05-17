import FaqPage from "@/components/Newhomepage/FaqPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | KI Bewerbungsfotos",
  description:
    "Erfahren Sie mehr über die Verwendung von KI-Bewerbungsfotos. Hier finden Sie Informationen zu unseren Leistungen, Rückerstattungen und vielem mehr.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | KI Bewerbungsfotos",
    description:
      "Erfahren Sie mehr über die Verwendung von KI-Bewerbungsfotos. Hier finden Sie Informationen zu unseren Leistungen, Rückerstattungen und vielem mehr.",
    url: "/faq",
    siteName: "KI Bewerbungsfotos Profi",
    locale: "de_DE",
    type: "website",
  },
};

const Faq = () => <FaqPage />;

export default Faq;
