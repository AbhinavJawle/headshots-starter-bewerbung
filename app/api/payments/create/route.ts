import { dodopayments } from "@/lib/dodopayments";
import { CountryCode } from "dodopayments/resources/misc";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

const paymentRequestSchema = z.object({
  formData: z.object({
    city: z.string(),
    country: z.string(),
    state: z.string(),
    addressLine: z.string(),
    zipCode: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { formData } = paymentRequestSchema.parse(body);

    const supabase = createServerComponentClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "User not authenticated",
        },
        { status: 401 }
      );
    }

    const response = await dodopayments.payments.create({
      billing: {
        city: formData.city,
        country: formData.country as CountryCode,
        state: formData.state,
        street: formData.addressLine,
        zipcode: formData.zipCode,
      },
      customer: {
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
      },
      payment_link: true,
      //live
      product_cart: [
        {
          product_id: `${process.env.BASIC_LIVE}`,
          quantity: 1,
        },
      ],
      //test:
      // product_cart: [
      //   {
      //     product_id:  `${process.env.BASIC_TEST}`,
      //     quantity: 1,
      //   },
      // ],
      allowed_payment_method_types: ["credit", "debit"],

      metadata: {
        userId: user.id,
        // You can add other relevant metadata here, like product_id if it's fixed or determined here
        // For dynamic products, this might be better handled if Dodo allows passing line_item metadata
      },
      return_url: process.env.DEPLOYMENT_URL
        ? `https://${process.env.DEPLOYMENT_URL}/overview`
        : "http://localhost:3000/overview",
    });

    return NextResponse.json({ paymentLink: response.payment_link });
  } catch (err) {
    console.error("Payment link creation failed", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
