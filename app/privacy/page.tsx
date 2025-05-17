import PrivacyPage from "@/components/Newhomepage/PrivacyPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | KI Bewerbungsfotos",
  description:
    "Unsere Datenschutzerklärung für den Service von KI Bewerbungsfotos. Erfahren Sie, wie wir Ihre Daten schützen.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/privacy",
  },
};

const Terms = () => <PrivacyPage />;

export default Terms;
