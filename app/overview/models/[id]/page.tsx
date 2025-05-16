import Login from "@/app/login/page";
import { Icons } from "@/components/icons";
import ClientSideModel from "@/components/realtime/ClientSideModel";
import DownloadImagesButton from "@/components/DownloadImagesButton"; // <-- Add this import
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Button } from "@chakra-ui/react";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const dynamic = "force-dynamic";

export default async function Index({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Login />;
  }

  const { data: model } = await supabase
    .from("models")
    .select("*")
    .eq("id", Number(params.id))
    .eq("user_id", user.id)
    .single();

  if (!model) {
    redirect("/overview");
  }

  const { data: imagesData } = await supabase // Renamed to imagesData to avoid conflict if 'images' is used elsewhere
    .from("images")
    .select("*") // Select all fields
    // .select("uri") // Only select uri if that's all you need for download
    .eq("modelId", model.id);
  console.log("IMAGESDATA", imagesData); // Log the imagesData to the console to check if it's being fetched correctly
  const { data: samples } = await supabase
    .from("samples")
    .select("*")
    .eq("modelId", model.id);

  return (
    <div id="train-model-container" className="w-full h-full">
      <div className="flex flex-col items-start gap-4 w-full mb-6 px-4 py-3 bg-gray-50 border-b border-gray-200 md:flex-row md:items-center md:justify-between">
        {/* Left Group: Go Back Button and Model Info */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
          {" "}
          <Link href="/overview" className="text-xs w-fit">
            <Button
              variant="outline"
              size={{ base: "sm", md: "md" }}
              borderColor="brand.500"
              color="brand.500"
              _hover={{ bg: "brand.50" }}
            >
              <FaArrowLeft className="mr-2" />
              Zurück
            </Button>
          </Link>
          {/* Model Name and Status */}
          <div className="flex flex-row gap-2 items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {model.name}
            </h1>
            <div>
              <Badge
                variant={model.status === "finished" ? "default" : "secondary"}
                className="text-xs font-medium bg-[#3dacec] text-white rounded-md px-2 py-1"
              >
                {/* {model.status === "processing" ? "anlernen..." :  model.status} */}
                {model.status === "processing" ? "anlernen..." : "Fertig"}

                {model.status === "processing" && (
                  <Icons.spinner className="h-4 w-4 animate-spin ml-2 inline-block" />
                )}
              </Badge>
            </div>
          </div>
        </div>

        {/* Download Button - pushed to the right on md screens, full width on smaller screens if desired */}
        <div className="w-full md:w-auto">
          {" "}
          {/* Ensures button can take full width if needed on mobile, auto on larger */}
          {imagesData &&
            imagesData.length > 0 &&
            model.status === "finished" && (
              <DownloadImagesButton
                images={imagesData}
                modelName={model.name || "model"}
              />
            )}
        </div>
      </div>

      <ClientSideModel
        samples={samples ?? []}
        serverModel={model}
        serverImages={imagesData ?? []} // Pass imagesData here as well
      />
    </div>
  );
}
