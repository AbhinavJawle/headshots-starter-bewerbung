import React from "react";
import { Box, Heading } from "@chakra-ui/react"; // Using Box from Chakra

// Updated list of images based on the /public/headshots directory
const originalImages = [
  "18160188-0.jpg",
  "18160203-0.jpg",
  "18611192-0.jpg",
  "18611194-0.jpg",
  "18611231-0.jpg",
  "18611282-0.jpg",
  "18611295-0.jpg",
  "18611328-0.jpg",
  "18611361-0.jpg",
  "18611389-0.jpg",
  "18611405-0.jpg",
  "18762787-0.jpg",
  "19127437-0.jpg",
  "19128132-0.jpg",
  "19150305-0.jpg",
  "19702812-0.jpg",
  "19702815-0.jpg",
  "19785607-0.jpg",
  "19790499-0.jpg",
  "19791315-0.jpg",
  "19799102-0.jpg",
  "19877825-0.jpg",
  "19877923-0.jpg",
  "19917131-0.jpg",
  "19924006-0.jpg",
  "19929323-0.jpg",
  "19931614-0.jpg",
  "19932016-0.jpg",
  "19932535-0.jpg",
  "19933897-0.jpg",
  "19933902-0.jpg",
  "20064736-0.jpg",
  "20064820-0.jpg",
  "20089890-0.jpg",
  "20242199-0.jpg",
  "20242203-0.jpg",
  "20391567-0.jpg",
  "20846637-0.jpg",
  "20856428-0.jpg",
  "20976849-0.jpg",
  "20976852-0.jpg",
  "21112299-0.jpg",
  "21112607-0.jpg",
  "21112739-0.jpg",
  "21123478-0.jpg",
  "21134390-0.jpg",
  "21137238-0.jpg",
  "21430800-0.jpg",
  "21430840-0.jpg",
  "21494746-0.jpg",
  "21494752-0.jpg",
  "21494755-0.jpg",
  "21765051-0.jpg",
  "21870568-0.jpg",
  "21870738-0.jpg",
  "21870752-0.jpg",
  "21870807-0.jpg",
  "21870849-0.jpg",
  "21918498-0.jpg",
  "22059216-0.jpg",
  "22385368-0.jpg",
  "22733930-0.jpg",
  "22991524-0.jpg",
  "23307421-0.jpg",
  "23343531-0.jpg",
  "23352072-0.jpg",
  "23429888-0.jpg",
  "23430315-0.jpg",
  "23431270-0.jpg",
  "24283725-0.jpg",
  "24283870-0.jpg",
  "24284070-0.jpg",
  "24291051-0.jpg",
  "24951535-0.jpg",
  "25018045-0.jpg",
  "25018046-2.jpg",
  "25111912-1.jpg",
  "25112068-0.jpg",
  "25112135-1.jpg",
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
const animationDurationSeconds = 100;

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
              <img
                src={`/headshots/${img}`}
                alt={`Beispiel KI Bewerbungsfoto ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-sm" // Initial shadow
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
