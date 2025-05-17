import RefundPage from "@/components/Newhomepage/RefundPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rückerstattungsrichtlinie | KI Bewerbungsfotos",
  description:
    "Unsere Rückerstattungsrichtlinie für KI Bewerbungsfotos. Erfahren Sie mehr über die Bedingungen für eine Rückerstattung.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/refund",
  },
};

const Terms = () => <RefundPage />;

export default Terms;
