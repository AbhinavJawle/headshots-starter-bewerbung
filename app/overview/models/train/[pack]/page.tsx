"use client";

import TrainModelZone from "@/components/TrainModelZone";
import Information from "@/components/Information";
import { Button } from "@chakra-ui/react";
import { Box, useBreakpointValue } from "@chakra-ui/react"; // SimpleGrid removed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export default function Index({ params }: { params: { pack: string } }) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 py-4">
        <Link
          href={packsIsEnabled ? "/overview/stil" : "/overview"}
          className="text-sm w-fit"
        >
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

        {isMobile ? (
          // Mobile Layout: Information on top, then Form Card
          <>
            <Box mb={4}>
              <Information />
            </Box>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Bewerbungsfoto-KI</CardTitle>
                <CardDescription>
                  Geben Sie Ihren Namen, Geschlecht ein und laden Sie einige
                  Fotos hoch, um loszulegen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TrainModelZone packSlug={params.pack} />
              </CardContent>
            </Card>
          </>
        ) : (
          // Desktop Layout: Form Card on left, Information on right
          <Box display="flex" flexDirection="row" gap={5} alignItems="start">
            <Box flexGrow={1} flexBasis="0" minWidth="0">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Bewerbungsfoto-KI</CardTitle>
                  <CardDescription>
                    Geben Sie Ihren Namen, Geschlecht ein und laden Sie einige
                    Fotos hoch, um loszulegen.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TrainModelZone packSlug={params.pack} />
                </CardContent>
              </Card>
            </Box>
            <Box
              flexShrink={0}
              flexBasis={{ base: "100%", md: "400px" }}
              minWidth="0"
              maxWidth={{ md: "400px" }}
            >
              <Information />
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
}
