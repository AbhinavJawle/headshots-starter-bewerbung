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

// let event: any; // Remove or comment out the global event variable

const webhook = new Webhook(process.env.NEXT_PUBLIC_DODO_WEBHOOK_KEY!);

export async function POST(request: Request) {
  const headersList = await headers();
  let payload: WebhookPayload; // Define payload here to use it throughout

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

    payload = JSON.parse(rawBody) as WebhookPayload; // Assign to local payload

    // Ensure customer and customer_id exist in the payload structure from Dodo Payments
    if (!payload.data?.customer?.email) {
      // This check implies customer data is under payload.data.customer
      logger.error("Missing customer email in Dodo payment webhook payload", {
        payloadData: payload.data,
      });
      throw new Error("Missing customer email in payload");
    }
    // event = payload; // No longer assigning to global event

    // Optional: Log successful parsing and initial payload structure for easier debugging
    // logger.info("Webhook payload parsed successfully", { payloadType: payload.type, customerEmail: payload.data?.customer?.email });

    // Return a success response here if you only want to acknowledge receipt before processing
    // This can prevent timeouts if Supabase operations take too long, but then you need to ensure
    // the subsequent logic is robust or handled asynchronously.
    // For now, we'll process inline.
    // return Response.json(
    //   { message: "Webhook received successfully, processing payment." },
    //   { status: 200 }
    // );
  } catch (error) {
    logger.error("Webhook processing failed (verification or parsing)", error);
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
    case "payment.succeeded": // Ensure "payment.succeeded" is the correct event type from Dodo Payments
      // const checkoutSessionCompleted = event.data
      //   .object as Stripe.Checkout.Session;
      // const userId = checkoutSessionCompleted.client_reference_id;

      // IMPORTANT: Adjust this path based on the actual Dodo Payments webhook payload structure for customer_id.
      // It's likely under payload.data.customer, similar to the email.
      const userId = payload.data?.customer?.customer_id;
      logger.info("Attempting to process payment.succeeded", {
        userId,
        customerData: payload.data?.customer,
      });

      if (!userId) {
        logger.error(
          "Missing userId in Dodo payment webhook for payment.succeeded",
          { payloadData: payload.data }
        );
        return NextResponse.json(
          {
            message: `Missing userId in Dodo payment webhook. Cannot update credits.`,
          },
          { status: 400 }
        );
      }

      // TODO: These values should be derived from the Dodo Payments payload (e.g., payload.data.items, payload.data.metadata)
      // For example, if Dodo sends product details or a specific amount that maps to credits.
      // const lineItems = await stripe.checkout.sessions.listLineItems(
      //   checkoutSessionCompleted.id
      // );
      // const quantity = lineItems.data[0].quantity;
      const quantity = 1; // Placeholder: Get actual quantity from Dodo payload

      // const priceId = lineItems.data[0].price!.id;
      const priceId = "dodo_product_placeholder"; // Placeholder: Get actual product/price ID from Dodo payload

      // const creditsPerUnit = creditsPerPriceId[priceId];
      // You'll need a mapping for Dodo product IDs to credits, or get credits directly from payload if available
      const creditsPerUnit = 1; // Placeholder: Determine credits based on Dodo payload

      const totalCreditsPurchased = quantity! * creditsPerUnit;

      // console.log({ lineItems });
      logger.info("Calculated credits", {
        quantity,
        priceId,
        creditsPerUnit,
        totalCreditsPurchased,
        userId,
      });
      // console.log({ quantity });
      // console.log({ priceId });
      // console.log({ creditsPerUnit });

      // console.log("totalCreditsPurchased: " + totalCreditsPurchased);

      const { data: existingCredits, error: fetchError } = await supabase
        .from("credits")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116: "single" row not found, which is fine for new users
        logger.error("Error fetching existing credits from Supabase", {
          userId,
          error: fetchError,
        });
        return NextResponse.json(
          { message: `Error fetching credits: ${fetchError.message}` },
          { status: 500 }
        );
      }
      logger.info("Fetched existing credits", { userId, existingCredits });

      // If user has existing credits, add to it.
      if (existingCredits) {
        const newCredits = existingCredits.credits + totalCreditsPurchased;
        logger.info("Updating existing credits", {
          userId,
          oldCredits: existingCredits.credits,
          newCredits,
        });
        const { data: updateData, error: updateError } = await supabase
          .from("credits")
          .update({
            credits: newCredits,
          })
          .eq("user_id", userId)
          .select(); // Optionally .select() to get the updated row back

        if (updateError) {
          logger.error("Error updating credits in Supabase", {
            userId,
            error: updateError,
          });
          return NextResponse.json(
            {
              message: `Error updating credits: ${updateError.message}`,
            },
            {
              status: 400, // Or 500 for server-side Supabase issues
            }
          );
        }
        logger.info("Successfully updated credits", {
          userId,
          updatedData: updateData,
        });
      } else {
        // Else create new credits row.
        logger.info("Creating new credits row", {
          userId,
          totalCreditsPurchased,
        });
        const { data: insertData, error: insertError } = await supabase
          .from("credits")
          .insert({
            user_id: userId,
            credits: totalCreditsPurchased,
          })
          .select(); // Optionally .select() to get the inserted row back

        if (insertError) {
          logger.error("Error inserting new credits in Supabase", {
            userId,
            error: insertError,
          });
          return NextResponse.json(
            {
              message: `Error creating credits: ${insertError.message}`,
            },
            {
              status: 400, // Or 500
            }
          );
        }
        logger.info("Successfully inserted new credits", {
          userId,
          insertedData: insertData,
        });
      }

      return NextResponse.json(
        {
          message: "Credits updated successfully",
        },
        { status: 200 }
      );

    default:
      console.log("Unhandled webhook event type", { type: payload.type });
      return NextResponse.json(
        {
          message: `Unhandled event type ${payload.type}`,
        },
        { status: 400 }
      );
  }
}
