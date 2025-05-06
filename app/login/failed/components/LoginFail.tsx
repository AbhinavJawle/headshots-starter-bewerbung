import {
  Box,
  Flex,
  VStack,
  Text,
  Link as ChakraLink,
  HStack,
  Icon,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Link from "next/link";

export const LoginFail = ({
  errorMessage,
}: {
  errorMessage: string | null;
}) => {
  const bgGradient = useColorModeValue(
    "linear(to-br, red.50, orange.50)",
    "linear(to-br, red.900, orange.900)"
  );
  
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Center minH="calc(100vh - 73px)" bg={bgGradient} px={{ base: 4, md: 0 }}>
      <VStack
        spacing={{ base: 4, md: 6 }}
        bg={cardBg}
        border="1px"
        borderColor="red.300"
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
          background: "linear-gradient(45deg, #FF6B6B, #FFB88C)",
          zIndex: "-1",
          borderRadius: "xl",
          opacity: "0.5",
        }}
      >
        <Text 
          fontSize={{ base: "xl", md: "2xl" }} 
          fontWeight="bold" 
          color="red.500"
          textAlign="center"
        >
          Login Error
        </Text>
        <VStack spacing={{ base: 3, md: 4 }} align="center">
          <Text 
            fontSize={{ base: "sm", md: "md" }} 
            textAlign="center" 
            color="gray.700"
          >
            {errorMessage}
          </Text>
          <Text 
            fontSize={{ base: "xs", md: "sm" }} 
            color="gray.500" 
            textAlign="center"
          >
            Hint: Please make sure you open the link on the same device / browser from which you tried to signup.
          </Text>
        </VStack>
        <Box pt={{ base: 2, md: 4 }}>
          <ChakraLink as={Link} href="/login">
            <HStack
              spacing={2}
              fontSize={{ base: "sm", md: "md" }}
              align="center"
              justify="center"
              color="brand.500"
              fontWeight="medium"
              _hover={{ 
                textDecoration: "underline",
                color: "brand.600" 
              }}
            >
              <Text>Try Login Again</Text>
              <ExternalLinkIcon boxSize={{ base: 3, md: 4 }} />
            </HStack>
          </ChakraLink>
        </Box>
      </VStack>
    </Center>
  );
};
