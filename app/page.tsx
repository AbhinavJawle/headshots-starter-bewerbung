import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import HomePage from "@/components/Newhomepage/HomePage";
import { redirect } from "next/dist/server/api-utils";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (user) {
  //   return redirect("/");
  // }

  return <HomePage />;
}
