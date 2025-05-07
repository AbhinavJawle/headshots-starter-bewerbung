import { NextResponse } from "next/server";
import axios from "axios";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// Set dynamic route handling
export const dynamic = "force-dynamic";

const astriapackids = [
  //corporate - first 5
  { id: 1173, title: "Professional Headshot", category: "corporate" },
  { id: 260, title: "Corporate Headshot", category: "corporate" },
  { id: 806, title: "Styled For Work", category: "corporate" },
  { id: 650, title: "Styled for success", category: "corporate" },
  { id: 1888, title: "Corporate Confidence", category: "corporate" },

  //lawyer - next 3
  { id: 796, title: "Stylish Lawyers", category: "lawyer" },
  { id: 820, title: "Partner's Headshot", category: "lawyer" },
  { id: 1989, title: "Lawyer Headshot", category: "lawyer" },

  //medicine - next 1
  { id: 1991, title: "Doctor Headshots", category: "medicine" },

  //realtor - next 1
  { id: 406, title: "Realtor", category: "realtor" },
  
  //casual - next 5
  { id: 279, title: "J Crew", category: "casual" },
  { id: 811, title: "Casual Stylish Look", category: "casual" },
  { id: 1012, title: "Casual Studio", category: "casual" },
  { id: 855, title: "The Casual", category: "casual" },
  { id: 1722, title: "Studio Models", category: "casual" },

  //model - next 3
  { id: 407, title: "Speaker", category: "model" },
  { id: 592, title: "Stylish Pro", category: "model" },
  { id: 822, title: "Timeless Studio Looks", category: "model" },
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
    // Authorization header
    const headers = { Authorization: `Bearer ${API_KEY}` };

    // Define the endpoints based on the query type
    const endpoints: string[] = [];

    // if (QUERY_TYPE === "users" || QUERY_TYPE === "both") {
    //   endpoints.push(`${DOMAIN}/packs`);
    // }

    if (QUERY_TYPE === "gallery" || QUERY_TYPE === "both") {
      // endpoints.push(`${DOMAIN}/gallery/packs`);
      astriapackids.map((pack) => {
        endpoints.push(`${DOMAIN}/p/${pack.id}`);
      });
      // endpoints.push(`${DOMAIN}/gallery/packs`);
    }
    console.log("ENDPOINTS: ", endpoints);

    // Make concurrent requests
    const responses = await Promise.all(
      endpoints.map((url) => axios.get(url, { headers }))
    );

    // Process the responses to ensure we have all the necessary data
    const processedData = responses.map((response, index) => {
      // Add the category information from our astriapackids array
      return {
        ...response.data,
        category: astriapackids[index].category
      };
    });
    
    console.log("PROCESSED DATA: ", processedData);
    // Return the processed data as JSON, maintaining the original order
    return NextResponse.json(processedData);
  } catch (error) {
    console.error("Error fetching packs:", error);

    // Return error response
    return NextResponse.json(
      {
        message: "Failed to fetch packs.",
      },
      { status: 500 }
    );
  }
}
