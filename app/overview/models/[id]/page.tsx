import Login from "@/app/login/page";
import { Icons } from "@/components/icons";
import ClientSideModel from "@/components/realtime/ClientSideModel";
import DownloadImagesButton from "@/components/DownloadImagesButton"; // <-- Add this import
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

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
    .select("uri") // Only select uri if that's all you need for download
    .eq("modelId", model.id);
  console.log("IMAGESDATA", imagesData); // Log the imagesData to the console to check if it's being fetched correctly
  const { data: samples } = await supabase
    .from("samples")
    .select("*")
    .eq("modelId", model.id);

  return (
    <div id="train-model-container" className="w-full h-full">
      <div className="flex flex-row gap-4 items-center">
        {" "}
        {/* Added items-center for vertical alignment */}
        <Link href="/overview" className="text-xs w-fit">
          <Button variant={"outline"} className="text-xs" size="sm">
            <FaArrowLeft className="mr-2" />
            Go Back
          </Button>
        </Link>
        <div className="flex flex-row gap-2 align-middle text-center items-center pb-4">
          <h1 className="text-xl">{model.name}</h1>
          <div>
            <Badge
              variant={model.status === "finished" ? "default" : "secondary"}
              className="text-xs font-medium bg-[#3dacec] text-white rounded-md px-2 py-1"
            >
              {model.status === "processing" ? "training" : model.status}
              {model.status === "processing" && (
                <Icons.spinner className="h-4 w-4 animate-spin ml-2 inline-block" />
              )}
            </Badge>
          </div>
        </div>
        {/* Add the Download Button here, ensure imagesData is not null */}
        {imagesData && imagesData.length > 0 && model.status === "finished" && (
          <DownloadImagesButton
            images={imagesData}
            modelName={model.name || "model"}
          />
        )}
      </div>

      <ClientSideModel
        samples={samples ?? []}
        serverModel={model}
        serverImages={imagesData ?? []} // Pass imagesData here as well
      />
    </div>
  );
}
