import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "../../types/supabase";
import { Login } from "./components/Login";
import { Box } from "@chakra-ui/react";
import { Metadata } from 'next'; 

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Anmelden | KI Bewerbungsfotos", 
  robots: {
    index: false,
    follow: true, 
  },
  alternates: {
    canonical: '/login',
  }
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/overview");
  }

  const headersList = headers();
  const host = headersList.get("host");

  return (
    <Box w="full" minH="calc(100vh - 73px)">
      <Login host={host} searchParams={searchParams} />
    </Box>
  );
}
