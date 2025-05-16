"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Database } from "@/types/supabase";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { modelRowWithSamples } from "@/types/utils";
import { Divider } from "@chakra-ui/react";

type ModelsTableProps = {
  models: modelRowWithSamples[];
};

export default function ModelsTable({ models }: ModelsTableProps) {
  const router = useRouter();
  const handleRedirect = (id: number) => {
    router.push(`/overview/models/${id}`);
  };

  return (
    <div className="rounded-md border">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Stand</TableHead>
            <TableHead>Datei</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models?.map((model) => (
            <TableRow
              key={model.modelId}
              onClick={() => handleRedirect(model.id)}
              className="cursor-pointer h-16"
            >
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>
                <div>
                  <Badge
                    className="flex gap-2 items-center w-min bg-[#3dacec] text-white rounded-md px-2 py-1 text-sm"
                    variant={
                      model.status === "finished" ? "default" : "secondary"
                    }
                  >
                    {/* {model.status === "processing"
                      ? "anlernen..."
                      : model.status} */}
                    {model.status === "processing" ? "anlernen..." : "Fertig"}
                    {model.status === "processing" && (
                      <Icons.spinner className="h-4 w-4 animate-spin" />
                    )}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 flex-shrink-0 items-center">
                  {model.samples.slice(0, 3).map((sample) => (
                    <Avatar key={sample.id}>
                      <AvatarImage src={sample.uri} className="object-cover" />
                    </Avatar>
                  ))}
                  {model.samples.length > 3 && (
                    <Badge className="rounded-full h-10" variant={"outline"}>
                      +{model.samples.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
