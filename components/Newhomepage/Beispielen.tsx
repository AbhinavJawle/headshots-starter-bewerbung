import React from "react";
import { Box } from "@chakra-ui/react"; // Using Box from Chakra
import Image from "next/image"; // Added next/image

// Updated list of images based on the /public/headshots directory
const originalImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
];

// Fisher-Yates (Knuth) Shuffle function
function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;
  const newArray = [...array]; // Create a copy to avoid mutating the original

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}

// Define image dimensions and spacing (adjust as needed)
const imageWidthRem = 8; // Corresponds to w-32
const imageHeightRem = 12; // Corresponds to h-48
// mx-1 applies 0.25rem margin left and 0.25rem margin right
const totalMarginXRem = 0.5; // Correct total horizontal margin per image

const totalImageWidthRem = imageWidthRem + totalMarginXRem; // Corrected calculation
const animationDurationSeconds = 60;

function Beispielen() {
  // Shuffle images on each render
  const shuffledImages = shuffleArray(originalImages);
  // Duplicate shuffled images for seamless effect
  const allImages = [...shuffledImages, ...shuffledImages];

  return (
    <Box className="w-full py-1 bg-gray-50 overflow-hidden">
      <Box
        className="relative w-full max-w-screen-xl mx-auto"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)", // Adjusted mask gradient
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)", // For Safari
        }}
      >
        {/* Inner container that scrolls */}
        <Box className="flex animate-scroll">
          {allImages.map((img, index) => (
            <Box
              key={`${img}-${index}`}
              className={`flex-shrink-0 w-32 h-48 mx-1`}
              transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out" // Add transition
              _hover={{
                // transform: "scale(1.05)", // Scale up on hover
                shadow: "md", // Optionally add/increase shadow on hover
              }}
            >
              <Image
                src={`/headshots/${img}`}
                alt={`Beispiel KI Bewerbungsfoto ${index + 1}`}
                width={128} // 8rem * 16px/rem
                height={192} // 12rem * 16px/rem
                className={"object-cover rounded-lg shadow-sm w-full h-full"} // Added w-full and h-full to ensure it fills the Box
                sizes="128px"
                quality={90} // Added quality prop
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Define animation using style jsx (or add to global CSS) */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(
              -${shuffledImages.length * totalImageWidthRem}rem
            );
          } /* Use corrected totalImageWidthRem */
        }

        .animate-scroll {
          animation: scroll ${animationDurationSeconds}s linear infinite;
          width: calc(
            ${shuffledImages.length * 2} * ${totalImageWidthRem}rem
          ); /* Use corrected totalImageWidthRem */
        }

        /* Removed pause on hover rule */
      `}</style>
    </Box>
  );
}

export default Beispielen;
