import { NextResponse } from "next/server";
import axios from "axios";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

const astriapackids = [
  { id: 260, title: "Corporate Headshot", category: "corporate" },
  { id: 820, title: "Bewerbungsfoto", category: "corporate" },
];

// Environment Variables
const API_KEY = process.env.ASTRIA_API_KEY;
const QUERY_TYPE = process.env.PACK_QUERY_TYPE || "users"; // Default to 'users'
const DOMAIN = "https://api.astria.ai";

// Check if API Key is missing
if (!API_KEY) {
  throw new Error("MISSING API_KEY!");
}

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const headers = { Authorization: `Bearer ${API_KEY}` };

    const endpoints: string[] = [];

    if (QUERY_TYPE === "gallery" || QUERY_TYPE === "both") {
      astriapackids.map((pack) => {
        endpoints.push(`${DOMAIN}/p/${pack.id}`);
      });
    }
    console.log("ENDPOINTS: ", endpoints);

    const responses = await Promise.all(
      endpoints.map((url) => axios.get(url, { headers }))
    );

    const processedData = responses.map((response, index) => {
      return {
        ...response.data,
        category: astriapackids[index].category,
      };
    });

    return NextResponse.json(processedData);
  } catch (error) {
    console.error("Error fetching packs:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch packs.",
      },
      { status: 500 }
    );
  }
}
