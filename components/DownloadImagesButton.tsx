"use client";

import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { FaDownload } from "react-icons/fa";

interface ImageForDownload {
  uri: string;
  // Add other properties if needed for naming, e.g., id or original_filename
}

interface DownloadImagesButtonProps {
  images: ImageForDownload[];
  modelName: string;
}

export default function DownloadImagesButton({ images, modelName }: DownloadImagesButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    console.log("[DownloadButton] Attempting to download images. Received props:", { images, modelName });

    if (!images || images.length === 0) {
      alert("No images to download.");
      console.log("[DownloadButton] No images provided or images array is empty.");
      return;
    }

    setIsLoading(true);
    const zip = new JSZip();
    console.log("[DownloadButton] JSZip instance created.");

    try {
      const imageProcessingPromises = images.map(async (image, index) => {
        console.log(`[DownloadButton] Image ${index + 1}/${images.length}: Original S3 URI: ${image.uri}`);
        
        // MODIFICATION: Use the proxy URL
        const proxyUrl = `/api/download-image?url=${encodeURIComponent(image.uri)}`;
        console.log(`[DownloadButton] Image ${index + 1}: Fetching via proxy: ${proxyUrl}`);

        try {
          // MODIFICATION: Fetch from the proxy URL
          const response = await fetch(proxyUrl);
          console.log(`[DownloadButton] Image ${index + 1}: Proxy response status: ${response.status}, ok: ${response.ok}`);

          if (!response.ok) {
            // Try to get error message from proxy if available
            let errorBody = `Failed to fetch via proxy ${proxyUrl}: ${response.status} ${response.statusText}`;
            try {
                const errorJson = await response.json();
                if (errorJson && errorJson.error) {
                    errorBody += ` - Server message: ${errorJson.error}`;
                }
            } catch (e) { /* ignore if response is not json */ }
            throw new Error(errorBody);
          }

          const blob = await response.blob();
          console.log(`[DownloadButton] Image ${index + 1}: Blob received from proxy. Size: ${blob.size}, Type: ${blob.type}`);

          if (blob.size === 0) {
            console.warn(`[DownloadButton] Image ${index + 1}: Blob for ${image.uri} (via proxy) is empty. Skipping this file.`);
            return null; // Indicate failure for this image
          }

          let filename = `image_${index + 1}`;
          const defaultExtension = ".jpg"; // Fallback extension

          try {
            // Use the original S3 URI for filename generation logic
            const s3Url = new URL(image.uri); 
            const pathParts = s3Url.pathname.split('/');
            const lastPart = decodeURIComponent(pathParts[pathParts.length - 1]);
            
            if (lastPart) {
                if (lastPart.includes('.')) {
                    filename = lastPart;
                } else {
                    if (blob.type && blob.type.startsWith("image/")) {
                        const ext = blob.type.split('/')[1];
                        filename = `${lastPart}.${ext}`;
                    } else {
                        filename = `${lastPart}${defaultExtension}`;
                    }
                }
            } else {
                 if (blob.type && blob.type.startsWith("image/")) {
                    const ext = blob.type.split('/')[1];
                    filename = `image_${index + 1}.${ext}`;
                 } else {
                    filename = `image_${index + 1}${defaultExtension}`;
                 }
            }
          } catch (e) {
            console.warn(`[DownloadButton] Image ${index + 1}: Could not parse S3 URI for filename, using default name. Error:`, e);
            if (blob.type && blob.type.startsWith("image/")) {
                const ext = blob.type.split('/')[1];
                filename = `image_${index + 1}.${ext}`;
            } else {
                filename = `image_${index + 1}${defaultExtension}`;
            }
          }
          
          console.log(`[DownloadButton] Image ${index + 1}: Adding to zip as: "${filename}"`);
          zip.file(filename, blob);
          console.log(`[DownloadButton] Image ${index + 1}: Successfully registered "${filename}" with zip.`);
          return filename; // Indicate success
        } catch (error) {
          console.error(`[DownloadButton] Image ${index + 1}: Error processing image ${image.uri} (via proxy):`, error);
          return null; // Indicate failure for this image
        }
      });

      const results = await Promise.all(imageProcessingPromises);
      const successfulFiles = results.filter((r) => r !== null);

      console.log(
        `[DownloadButton] Finished processing all images. Successfully processed ${successfulFiles.length} out of ${images.length} images.`
      );
      console.log(
        `[DownloadButton] Files in zip object before generation: ${
          Object.keys(zip.files).length
        }`
      );

      if (Object.keys(zip.files).length === 0) {
        alert(
          "No images could be added to the zip. Please check the browser console for errors."
        );
        console.error(
          "[DownloadButton] No files were added to the zip. Aborting download."
        );
        setIsLoading(false);
        return;
      }

      console.log("[DownloadButton] Generating ZIP file...");
      const zipBlob = await zip.generateAsync({ type: "blob" });
      console.log(
        `[DownloadButton] ZIP file generated. Blob size: ${zipBlob.size}, Type: ${zipBlob.type}`
      );

      if (zipBlob.size < 100 && Object.keys(zip.files).length > 0) {
        // Small threshold for an empty zip header
        console.warn(
          "[DownloadButton] Generated zip file is very small, potentially empty despite files being added. This is unexpected."
        );
      }

      saveAs(zipBlob, `${modelName}_headshots.zip`);
      console.log(
        `[DownloadButton] Download triggered for "${modelName}_headshots.zip".`
      );
    } catch (error) {
      console.error("[DownloadButton] Error creating ZIP file:", error);
      alert("Failed to create ZIP file. Please try again and check the console.");
    } finally {
      setIsLoading(false);
      console.log("[DownloadButton] Download process finished. isLoading set to false.");
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading || !images || images.length === 0}
      size="sm"
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <FaDownload className="mr-2 h-4 w-4" />
      )}
      Download All ({images?.length || 0})
    </Button>
  );
}
