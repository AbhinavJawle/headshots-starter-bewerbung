import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import HomePage from "@/components/Newhomepage/HomePage";
// import { redirect } from "next/dist/server/api-utils"; // Assuming redirect is not immediately needed based on current logic
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const siteUrl = process.env.DEPLOYMENT_URL || "https://kibewerbungsfotos.de"; // Ensure this is consistent

export async function generateMetadata(): Promise<Metadata> {
  // Optionally fetch data here if needed for metadata
  return {
    title: "KI Bewerbungsfoto Erstellen: Moderne & Professionelle Fotos Online",
    description:
      "Erstellen Sie Ihr perfektes KI Bewerbungsfoto online. Modern, professionell und in wenigen Minuten. Machen Sie Ihr Bewerbungsfoto selber – mit KI!",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title:
        "KI Bewerbungsfoto: Moderne & Professionelle Bilder Online Gestalten",
      description:
        "Nutzen Sie KI, um Ihr Bewerbungsfoto selber zu machen. Schnell, einfach und überzeugend für den modernen Arbeitsmarkt.",
      url: siteUrl,

      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (user) {
  //   // return redirect("/"); // Or to a dashboard, etc.
  // }

  return <HomePage />;
}
