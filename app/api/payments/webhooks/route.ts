import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { logger } from "@/lib/logger";
import { WebhookPayload } from "@/types/api-types";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// const oneCreditPriceId = process.env.STRIPE_PRICE_ID_ONE_CREDIT as string;
// const threeCreditsPriceId = process.env.STRIPE_PRICE_ID_THREE_CREDITS as string;
// const fiveCreditsPriceId = process.env.STRIPE_PRICE_ID_FIVE_CREDITS as string;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// const creditsPerPriceId: {
//   [key: string]: number;
// } = {
//   [oneCreditPriceId]: 1,
//   [threeCreditsPriceId]: 3,
//   [fiveCreditsPriceId]: 5,
// };

let event: any;

const webhook = new Webhook(process.env.NEXT_PUBLIC_DODO_WEBHOOK_KEY!);

export async function POST(request: Request) {
  const headersList = await headers();

  try {
    const rawBody = await request.text();
    logger.info("Received webhook request", { rawBody });

    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };

    await webhook.verify(rawBody, webhookHeaders);
    logger.info("Webhook verified successfully");

    const payload = JSON.parse(rawBody) as WebhookPayload;

    if (!payload.data?.customer?.email) {
      throw new Error("Missing customer email in payload");
    }
    event = payload;
    // event = payload.type;

    // return Response.json(
    //   { message: "Webhook processed successfully" },
    //   { status: 200 }
    // );
  } catch (error) {
    logger.error("Webhook processing failed", error);
    return Response.json(
      {
        error: "Webhook processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }

  // Handle the event
  const supabase = createClient<Database>(
    supabaseUrl as string,
    supabaseServiceRoleKey as string,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    }
  );
  switch (event.type) {
    case "payment.succeeded":
      // const checkoutSessionCompleted = event.data
      //   .object as Stripe.Checkout.Session;
      // const userId = checkoutSessionCompleted.client_reference_id;
      const userId = event.customer.customer_id;

      if (!userId) {
        return NextResponse.json(
          {
            message: `Missing userId`,
          },
          { status: 400 }
        );
      }

      // const lineItems = await stripe.checkout.sessions.listLineItems(
      //   checkoutSessionCompleted.id
      // );
      // const quantity = lineItems.data[0].quantity;
      const quantity = 1;

      // const priceId = lineItems.data[0].price!.id;
      const priceId = 0;

      // const creditsPerUnit = creditsPerPriceId[priceId];
      const creditsPerUnit = 1;

      const totalCreditsPurchased = quantity! * creditsPerUnit;

      // console.log({ lineItems });
      console.log({ quantity });
      console.log({ priceId });
      console.log({ creditsPerUnit });

      console.log("totalCreditsPurchased: " + totalCreditsPurchased);

      const { data: existingCredits } = await supabase
        .from("credits")
        .select("*")
        .eq("user_id", userId)
        .single();

      // If user has existing credits, add to it.
      if (existingCredits) {
        const newCredits = existingCredits.credits + totalCreditsPurchased;
        const { data, error } = await supabase
          .from("credits")
          .update({
            credits: newCredits,
          })
          .eq("user_id", userId);

        if (error) {
          console.log(error);
          return NextResponse.json(
            {
              message: `Error updating credits: ${JSON.stringify(
                error
              )}. data=${data}`,
            },
            {
              status: 400,
            }
          );
        }

        return NextResponse.json(
          {
            message: "success",
          },
          { status: 200 }
        );
      } else {
        // Else create new credits row.
        const { data, error } = await supabase.from("credits").insert({
          user_id: userId,
          credits: totalCreditsPurchased,
        });

        if (error) {
          console.log(error);
          return NextResponse.json(
            {
              message: `Error creating credits: ${error}\n ${data}`,
            },
            {
              status: 400,
            }
          );
        }
      }

      return NextResponse.json(
        {
          message: "success",
        },
        { status: 200 }
      );

    default:
      return NextResponse.json(
        {
          message: `Unhandled event type ${event.type}`,
        },
        { status: 400 }
      );
  }
}
