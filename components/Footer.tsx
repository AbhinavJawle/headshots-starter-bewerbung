"use client";
// import Link from "next/link";
// import { Camera } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="border-t py-12 md:py-16">
//       <div className="container px-4 md:px-6">
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//           <div className="space-y-4">
//             <Link href="/" className="flex items-center gap-2 font-bold text-xl">
//               <Camera className="h-5 w-5 text-primary" />
//               <span>Headshots AI</span>
//             </Link>
//             <p className="text-sm text-muted-foreground">
//               Professional AI-generated headshots for your online presence.
//             </p>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-sm font-medium">Product</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                   How It Works
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                   Examples
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                   Pricing
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-sm font-medium">Resources</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="https://github.com/astriaai/headshots-starter"
//                   className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//                   target="_blank"
//                 >
//                   GitHub
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="https://docs.astria.ai/docs/api/pack/pack/"
//                   className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//                   target="_blank"
//                 >
//                   Documentation
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="https://twitter.com/Astria_AI"
//                   className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//                   target="_blank"
//                 >
//                   Twitter
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-sm font-medium">Legal</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="mailto:support@astria.ai"
//                   className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="https://choosealicense.com/licenses/mit/"
//                   className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//                   target="_blank"
//                 >
//                   License
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
//           <p className="text-sm text-muted-foreground">
//             © {new Date().getFullYear()} Headshots AI. All rights reserved.
//           </p>
//           <div className="flex items-center gap-4">
//             <p className="text-sm text-muted-foreground">
//               Open-source powered by{" "}
//               <Link
//                 href="https://www.astria.ai/"
//                 className="text-primary hover:underline"
//                 target="_blank"
//               >
//                 Astria
//               </Link>
//               ,{" "}
//               <Link
//                 href="https://supabase.com/"
//                 className="text-primary hover:underline"
//                 target="_blank"
//               >
//                 Supabase
//               </Link>
//               , and{" "}
//               {process.env.DEPLOYMENT_PROVIDER === "replit" ? (
//                 <Link
//                   href="https://replit.com/@leap-ai/Headshot-AI-Professional-Headshots-with-Leap-AI"
//                   className="text-primary hover:underline"
//                   target="_blank"
//                 >
//                   Replit
//                 </Link>
//               ) : (
//                 <Link
//                   href="https://vercel.com/"
//                   className="text-primary hover:underline"
//                   target="_blank"
//                 >
//                   Vercel
//                 </Link>
//               )}
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Box, chakra, Container, Stack, Text } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { ReactNode } from "react";
import { MdAlternateEmail } from "react-icons/md";
import Link from "next/link";

const SocialButton = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <chakra.button
      href={href}
      as="a"
      bg="blackAlpha.100"
      rounded="full"
      w={8}
      h={8}
      target="_blank"
      cursor="pointer"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: "blackAlpha.400",
      }}
    >
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box>
      <Container
        as={Stack}
        maxWidth="container.lg"
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={6}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text></Text>
        <Stack alignItems="center" direction="row" spacing={4}>
          <Text fontSize="sm">
            <Link href="/terms">Terms and Privacy</Link>
          </Text>
          <Text fontSize="sm">
            <Link href="/faq">FAQ</Link>
          </Text>
          <SocialButton href="https://github.com/shinework/photoshot">
            <FaGithub />
          </SocialButton>
          <SocialButton href="https://twitter.com/photoshot_ai">
            <FaTwitter />
          </SocialButton>
          <SocialButton href="mailto:support@photoshot.app">
            <MdAlternateEmail />
          </SocialButton>
          <Text
            display={{ base: "none", sm: "block" }}
            fontSize="lg"
            fontWeight="bold"
          >
            Photoshot.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
