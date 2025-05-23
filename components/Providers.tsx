"use client";

import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
// import { Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// import Footer from "./layout/Footer";
// import Header from "./layout/Header";
import Header from "./Navbar";
import Footer from "./Footer";

import theme from "@/styles/theme";
import "react-medium-image-zoom/dist/styles.css";

const queryClient = new QueryClient();
export const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"] 
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Flex className={inter.className} flexDirection="column" minH="100vh">
          <Header />
          {children}
          <Footer />
          <Analytics />
        </Flex>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
