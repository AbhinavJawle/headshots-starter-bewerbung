import Login from "../login/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Box } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Login />;
  }

  return (
    <Box
      width="full"
      maxWidth="container.xl"
      marginX="auto"
      paddingX={{ base: 4, md: 8 }}
      paddingY={6}
    >
      {children}
    </Box>
  );
}
