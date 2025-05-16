import PacksGalleryZone from "@/components/PacksGalleryZone";
// import { Button } from "@/components/ui/button";
import { Button } from "@chakra-ui/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { redirect } from "next/navigation";

const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export default async function Index() {
  if (!packsIsEnabled) {
    redirect("/overview");
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        id="train-model-container"
        className="flex flex-1 flex-col gap-2 px-2"
      >
        <Link href="/overview" className="text-sm w-fit">
          <Button
            variant="outline"
            size="md"
            borderColor="brand.500"
            color="brand.500"
            _hover={{ bg: "brand.50" }}
          >
            <FaArrowLeft className="mr-2" />
            Zurück
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Stil-Galerie</CardTitle>
            <CardDescription>
              Wählen Sie den Typ der Bilder aus, die Sie erstellen möchten.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <PacksGalleryZone />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
