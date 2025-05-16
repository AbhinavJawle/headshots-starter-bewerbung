import React from "react";
import CustomerPaymentForm from "@/components/CustomerForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <CustomerPaymentForm user={user} />
    </>
  );
}
