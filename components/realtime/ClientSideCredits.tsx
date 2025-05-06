"use client";

import { Database } from "@/types/supabase";
import { creditsRow } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Badge, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { IoIosFlash } from "react-icons/io";

export const revalidate = 0;

type ClientSideCreditsProps = {
  creditsRow: creditsRow | null;
};

export default function ClientSideCredits({
  creditsRow,
}: ClientSideCreditsProps) {
  if (!creditsRow)
    return (
      <Flex align="center" gap={1}>
        <Icon as={IoIosFlash} color="brand.500" />
        <Text fontWeight="medium">Credits: 0</Text>
      </Flex>
    );

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [credits, setCredits] = useState<creditsRow>(creditsRow);

  useEffect(() => {
    const channel = supabase
      .channel("realtime credits")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "credits" },
        (payload: { new: creditsRow }) => {
          setCredits(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, credits, setCredits]);

  if (!credits) return null;

  const bgColor = useColorModeValue("brand.50", "brand.900");
  const textColor = useColorModeValue("brand.700", "brand.200");

  return (
    <Flex align="center" gap={1}>
      <Badge
        display="flex"
        alignItems="center"
        px={2}
        py={1}
        borderRadius="full"
        bg={bgColor}
        color={textColor}
      >
        <Icon as={IoIosFlash} mr={1} />
        <Text fontWeight="medium">Credits: {credits.credits}</Text>
      </Badge>
    </Flex>
  );
}
