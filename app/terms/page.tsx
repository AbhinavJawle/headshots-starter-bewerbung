import TermsPage from "@/components/Newhomepage/TermsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB | KI Bewerbungsfotos",
  description:
    "Erfahren Sie mehr über unsere Allgemeinen Geschäftsbedingungen für die Erstellung von KI-generierten Bewerbungsfotos.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://example.com/agb", // Update with actual canonical URL
  },
};

const Terms = () => <TermsPage />;

export default Terms;
