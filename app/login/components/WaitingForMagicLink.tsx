import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Link as ChakraLink,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";

export const WaitingForMagicLink = ({
  toggleState,
}: {
  toggleState: () => void;
}) => {
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, blue.900, purple.900)"
  );
  
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("brand.500", "brand.400");

  return (
    <Center minH="calc(100vh - 73px)" bg={bgGradient} px={{ base: 4, md: 0 }}>
      <VStack
        spacing={{ base: 4, md: 6 }}
        bg={cardBg}
        border="1px"
        borderColor={borderColor}
        p={{ base: 6, md: 8 }}
        borderRadius="xl"
        maxW="sm"
        w="full"
        boxShadow="xl"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: "-2px",
          left: "-2px",
          right: "-2px",
          bottom: "-2px",
          background: "linear-gradient(45deg, #3dacec, #7DFFBC)",
          zIndex: "-1",
          borderRadius: "xl",
          opacity: "0.5",
        }}
      >
        <Text 
          fontSize={{ base: "xl", md: "2xl" }} 
          fontWeight="bold" 
          color="brand.500"
          textAlign="center"
        >
          Check your email to continue
        </Text>
        <VStack spacing={{ base: 3, md: 4 }} align="center">
          <Text 
            fontSize={{ base: "sm", md: "md" }} 
            textAlign="center"
          >
            We've emailed you a magic link to access your account.{" "}
          </Text>
          <ChakraLink
            as={Link}
            href="https://mail.google.com/mail/u/0/#inbox"
            target="_blank"
            rel="noopener noreferrer"
            color="brand.500"
            fontWeight="medium"
            _hover={{ textDecoration: "underline" }}
            fontSize={{ base: "sm", md: "md" }}
          >
            Open Gmail
          </ChakraLink>
          <Text 
            fontSize={{ base: "xs", md: "sm" }} 
            color="gray.500" 
            textAlign="center"
          >
            Hint: it might be in your spam folder.
          </Text>
        </VStack>
        <Box pt={{ base: 2, md: 4 }}>
          <Button
            onClick={toggleState}
            variant="outline"
            size={{ base: "sm", md: "md" }}
            leftIcon={<ArrowBackIcon />}
            borderColor="brand.500"
            color="brand.500"
            _hover={{ bg: "brand.50" }}
          >
            Go back
          </Button>
        </Box>
      </VStack>
    </Center>
  );
};
