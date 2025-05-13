import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { logger } from "@/lib/logger";
import { WebhookPayload, Payment } from "@/types/api-types";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// const oneCreditPriceId = process.env.STRIPE_PRICE_ID_ONE_CREDIT as string;
// const threeCreditsPriceId = process.env.STRIPE_PRICE_ID_THREE_CREDITS as string;
// const fiveCreditsPriceId = process.env.STRIPE_PRICE_ID_FIVE_CREDITS as string;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Define a mapping from Dodo Payments product_id to credits
// This needs to be configured based on your Dodo Payments product setup
const productIdToCredits: { [key: string]: number } = {
  pdt_N9oLHUhlbDeyciMDR7c3q: 1, // Example: 1 credit for this product ID
  // Add other product_ids and their corresponding credits here
  // "your_other_product_id_1": 5,
  // "your_other_product_id_2": 10,
};

const webhook = new Webhook(process.env.NEXT_PUBLIC_DODO_WEBHOOK_KEY!);

export async function POST(request: Request) {
  const headersList = await headers();
  let payload: WebhookPayload; // Declare payload here

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

    payload = JSON.parse(rawBody) as WebhookPayload; // Assign to outer scoped payload

    if (!payload.data?.customer?.email) {
      throw new Error("Missing customer email in payload");
    }

    console.log("-----------PAYLOAD------------", payload);
    console.log("-----------PAYLOAD DATA------------", payload.data);
    // console.log("-----------PAYLOAD------------", event); // OLD, uses event
    // console.log("-----------event DATA------------", event.data); // OLD, uses event
  } catch (error) {
    logger.error("Webhook processing failed", error);
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }

  // Handle the event using the local 'payload' variable
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
  switch (payload.type) {
    case "payment.succeeded":
      logger.info("Processing payment.succeeded event");

      const paymentSucceededData = payload.data as Payment; // Use payload.data and cast to Payment
      const userId = paymentSucceededData?.metadata?.userId as
        | string
        | undefined;

      logger.info(`Extracted userId from metadata: ${userId}`);

      if (!userId) {
        console.log("Missing userId in webhook metadata");
        return NextResponse.json(
          {
            message: "Missing userId in webhook metadata",
          },
          { status: 400 }
        );
      }

      // Determine credits based on product_id from Dodo Payments payload
      // Assuming the first item in product_cart is the one purchased.
      // Adjust if multiple items can be in a single Dodo payment or if structure differs.
      const purchasedItem = paymentSucceededData?.product_cart?.[0]; // Use paymentSucceededData
      const productId = purchasedItem?.product_id;
      const quantity = purchasedItem?.quantity || 1; // Default to 1 if quantity is not present

      if (!productId) {
        logger.info("Missing product_id in webhook payload product_cart");
        return NextResponse.json(
          {
            message: "Missing product_id in webhook payload",
          },
          { status: 400 }
        );
      }

      const creditsPerUnit = productIdToCredits[productId];

      if (creditsPerUnit === undefined) {
        logger.info(`No credit mapping found for product_id: ${productId}`);
        return NextResponse.json(
          {
            message: `Product ID ${productId} not configured for credits.`,
          },
          { status: 400 }
        );
      }

      const totalCreditsPurchased = quantity * creditsPerUnit;

      // console.log({ product_cart: paymentSucceededPayload?.product_cart });
      console.log({ quantity });
      // console.log({ priceId }); // priceId is not available in Dodo payload directly like this
      console.log({ creditsPerUnit });

      logger.info(
        `Total credits to be awarded: ${totalCreditsPurchased} for user ${userId}`
      );

      const { data: existingCredits, error: fetchError } = await supabase
        .from("credits")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 means no rows found, which is fine for new users
        logger.error("Error fetching existing credits", {
          userId,
          error: fetchError,
        });
        return NextResponse.json(
          {
            message: "Error fetching user credits",
            error: fetchError.message,
          },
          { status: 500 }
        );
      }

      if (existingCredits) {
        const newCredits = existingCredits.credits + totalCreditsPurchased;
        const { error: updateError } = await supabase
          .from("credits")
          .update({ credits: newCredits })
          .eq("user_id", userId);

        if (updateError) {
          logger.error("Error updating credits", {
            userId,
            error: updateError,
          });
          return NextResponse.json(
            {
              message: "Error updating credits",
              error: updateError.message,
            },
            { status: 500 }
          );
        }
        logger.info(
          `Successfully updated credits for user ${userId} to ${newCredits}`
        );
      } else {
        const { error: insertError } = await supabase.from("credits").insert({
          user_id: userId,
          credits: totalCreditsPurchased,
        });

        if (insertError) {
          logger.error("Error inserting new credits row", {
            userId,
            error: insertError,
          });
          return NextResponse.json(
            {
              message: "Error creating credits record",
              error: insertError.message,
            },
            { status: 500 }
          );
        }
        logger.info(
          `Successfully created credits row for user ${userId} with ${totalCreditsPurchased} credits`
        );
      }

      return NextResponse.json(
        { message: "Credits updated successfully" },
        { status: 200 }
      );

    default:
      return NextResponse.json(
        {
          message: `Unhandled event type ${payload.type}`, // Use payload.type
        },
        { status: 400 }
      );
  }
}
