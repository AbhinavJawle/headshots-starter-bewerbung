"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@chakra-ui/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaFemale, FaImages, FaMale, FaRainbow } from "react-icons/fa";
import * as z from "zod";
import { fileUploadFormSchema } from "@/types/zod";
import { upload } from "@vercel/blob/client";
import axios from "axios";
import { ImageInspector } from "./ImageInspector";
import {
  ImageInspectionResult,
  aggregateCharacteristics,
} from "@/lib/imageInspection";
import { Loader2 } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

type FormInput = z.infer<typeof fileUploadFormSchema>;

const dodoIsConfigured = process.env.NEXT_PUBLIC_DODO_IS_ENABLED === "true";

export default function TrainModelZone({ packSlug }: { packSlug: string }) {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<any>(null);

  const [credits, setCredits] = useState<any>(null);

  useEffect(() => {
    const fetchUserAndCredits = async () => {
      // Get user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      // Get credits if user exists
      if (user) {
        const { data } = await supabase
          .from("credits")
          .select("*")
          .eq("user_id", user.id)
          .single();
        setCredits(data);
      }
    };

    fetchUserAndCredits();
  }, [supabase]);

  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [characteristics, setCharacteristics] = useState<
    ImageInspectionResult[]
  >([]);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormInput>({
    resolver: zodResolver(fileUploadFormSchema),
    defaultValues: {
      name: "",
      type: "man",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = () => {
    if (dodoIsConfigured && credits && credits.credits < 1) {
      toast({
        title: "Nicht genügend Credits",
        description: (
          <div className="flex flex-col gap-4">
            <p>
              Sie haben nicht genügend Credits, um ein neues Modell zu
              trainieren.
            </p>
            <Link href="/overview/payment">
              <Button
                size={"md"}
                variant="brand"
                className="w-full"
                bg={"gray.100"}
              >
                Credits kaufen
              </Button>
            </Link>
          </div>
        ),
        duration: Infinity, // Infinite duration
        variant: "default",
      });
      return;
    }
    trainModel();
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles: File[] =
        acceptedFiles.filter(
          (file: File) => !files.some((f) => f.name === file.name)
        ) || [];

      // if user tries to upload more than 10 files, display a toast
      if (newFiles.length + files.length > 10) {
        toast({
          variant: "destructive",
          title: "Zu viele Bilder",
          description:
            "Sie können nur insgesamt 10 Bilder hochladen. Bitte versuchen Sie es erneut.",
          duration: 7000,
        });
        return;
      }

      // display a toast if any duplicate files were found
      if (newFiles.length !== acceptedFiles.length) {
        toast({
          variant: "destructive",
          title: "Doppelte Dateinamen",
          description:
            "Einige der Dateien, die Sie ausgewählt haben, wurden bereits hinzugefügt. Sie wurden ignoriert.",
          duration: 7000,
        });
      }

      // check that in total images do not exceed a combined 4.5MB
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      const newSize = newFiles.reduce((acc, file) => acc + file.size, 0);

      if (totalSize + newSize > 10 * 1024 * 1024) {
        toast({
          title: "Bilderüberschreiten die Größe",
          description:
            "Die Gesamtgröße der Bilder darf nicht 10MB überschreiten.",
          duration: 7000,
        });
        return;
      }

      setFiles([...files, ...newFiles]);

      toast({
        variant: "default",
        title: "Bilder ausgewählt",
        description: "Die Bilder wurden erfolgreich ausgewählt.",
        duration: 7000,
      });
    },
    [files]
  );

  const removeFile = useCallback(
    (file: File) => {
      setFiles(files.filter((f) => f.name !== file.name));
    },
    [files]
  );

  const handleInspectionComplete = (
    result: ImageInspectionResult,
    file: File
  ) => {
    setCharacteristics((prev) => [...prev, result]);
  };

  const trainModel = useCallback(async () => {
    setIsLoading(true);
    // Upload each file to Vercel blob and store the resulting URLs
    const blobUrls = [];

    if (files) {
      for (const file of files) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/astria/train-model/image-upload",
        });
        blobUrls.push(blob.url);
      }
    }

    // console.log(blobUrls, "blobUrls");
    const aggregatedCharacteristics = aggregateCharacteristics(characteristics);

    const payload = {
      urls: blobUrls,
      name: form.getValues("name").trim(),
      type: form.getValues("type"),
      pack: packSlug,
      characteristics: aggregatedCharacteristics,
    };

    // Send the JSON payload to the "/astria/train-model" endpoint
    const response = await fetch("/astria/train-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setIsLoading(false);

    if (!response.ok) {
      const responseData = await response.json();
      // const responseData = await response.json(); // Ensure responseData is declared here
      const responseMessage: string = responseData.message;
      console.error("Something went wrong! ", responseMessage);
      const messageWithButton = (
        <div className="flex flex-col gap-4">
          {responseMessage}
          <a href="/overview/payment">
            <Button size="sm">Credits kaufen</Button>
          </a>
        </div>
      );
      toast({
        title: "Etwas ist schief gelaufen!",
        description: responseMessage.includes("Not enough credits") ? (
          messageWithButton
        ) : responseMessage.includes("Not enough credits") ? (
          <div className="flex flex-col gap-4">
            <p>{responseMessage}</p>
            <Link href="/payment">
              <Button size="sm" variant="brand" className="w-full">
                Credits kaufen
              </Button>
            </Link>
          </div>
        ) : (
          responseMessage
        ),
        duration: 5000,
      });
      return;
    }

    toast({
      title: "Modell trainiert",
      description:
        "Das Modell wurde trainiert. Sie erhalten eine E-Mail, wenn das Modell bereit ist.",
      duration: 7000,
    });

    router.push("/overview");
  }, [files, characteristics, form, packSlug]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  const modelType = form.watch("type");

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
          <Loader2 className="h-16 w-16 text-white animate-spin mb-6" />
          <h2 className="text-white text-2xl font-semibold mb-2">
            Fotos werden hochgeladen...
          </h2>
          <p className="text-white text-lg text-center px-4">
            Bitte warten Sie einen Moment und schließen Sie dieses Fenster
            nicht.
          </p>
        </div>
      )}
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-md flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full rounded-md">
                  <FormLabel>Name</FormLabel>
                  <FormDescription>Geben Sie Ihren Namen ein.</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="e.g. Natalie Headshots"
                      {...field}
                      className="max-w-screen-sm"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <FormLabel>Geschlecht</FormLabel>
              <FormDescription>Wählen Sie das Geschlecht aus.</FormDescription>
              <RadioGroup
                defaultValue={modelType}
                className="grid grid-cols-3 gap-4"
                value={modelType}
                onValueChange={(value) => {
                  form.setValue("type", value);
                }}
              >
                <div>
                  <RadioGroupItem
                    value="man"
                    id="man"
                    className="peer sr-only"
                    aria-label="man"
                  />
                  <Label
                    htmlFor="man"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <FaMale className="mb-3 h-6 w-6" />
                    Mann
                  </Label>
                </div>

                <div>
                  <RadioGroupItem
                    value="woman"
                    id="woman"
                    className="peer sr-only"
                    aria-label="woman"
                  />
                  <Label
                    htmlFor="woman"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <FaFemale className="mb-3 h-6 w-6" />
                    Frau
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="person"
                    id="person"
                    className="peer sr-only"
                    aria-label="person"
                  />
                  <Label
                    htmlFor="person"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <FaRainbow className="mb-3 h-6 w-6" />
                    Unisex
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div
              {...getRootProps()}
              className=" rounded-md justify-center align-middle cursor-pointer flex flex-col gap-4"
            >
              <FormLabel>Bilder</FormLabel>
              <FormDescription>
                Laden Sie 5-10 Bilder der Person hoch, für die Sie Kopfbilder
                generieren möchten. Je mehr desto besser.
              </FormDescription>
              <div className="outline-dashed outline-2 outline-gray-100 hover:outline-blue-500 w-full h-full rounded-md p-4 flex justify-center align-middle">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="self-center">
                    Lassen Sie die Dateien hier fallen ...
                  </p>
                ) : (
                  <div className="flex justify-center flex-col items-center gap-2">
                    <FaImages size={32} className="text-gray-700" />
                    <p className="self-center">
                      Ziehen Sie die Dateien hierher, oder klicken Sie, um die
                      Dateien auszuwählen.
                    </p>
                  </div>
                )}
              </div>
            </div>
            {files.length > 0 && (
              <div className="flex flex-row gap-4 flex-wrap">
                {files.map((file) => (
                  <div key={file.name} className="flex flex-col gap-1">
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        className="rounded-md w-24 h-24 object-cover"
                        alt="Preview"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-1"
                        onClick={() => removeFile(file)}
                      >
                        Entfernen
                      </Button>

                      <ImageInspector
                        file={file}
                        type={form.getValues("type")}
                        onInspectionComplete={(result) =>
                          handleInspectionComplete(result, file)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              variant={"brand"}
              _disabled={{
                color: "gray.500",
                bg: "gray.100",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Wird hochgeladen</span>
                </>
              ) : (
                <span>Bewerbungsfoto generieren</span>
              )}

              {dodoIsConfigured && <span className="ml-1">(1 Credit)</span>}
            </Button>
            <p className="self-center">Der Upload braucht ~20 Sekunden.</p>
            <p className="self-center">
              Ihre Fotos werden gelöscht sobald der Prozess fertig ist.
            </p>
          </form>
        </Form>
      </div>
    </>
  );
}
