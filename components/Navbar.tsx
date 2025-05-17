"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import React from "react";
import { Database } from "@/types/supabase";
import ClientSideCredits from "./realtime/ClientSideCredits";
import Link from "next/link";
import {
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoIosFlash } from "react-icons/io";
import { HiLogout, HiArrowRight } from "react-icons/hi";

// Client components don't need dynamic = "force-dynamic"
export const dynamic = "force-dynamic";

const dodoIsConfigured = process.env.NEXT_PUBLIC_DODO_IS_ENABLED === "true";
const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

const Header = () => {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // Change this value to adjust when the navbar transforms
      const scrollThreshold = 80;

      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
        setCredits(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Dynamic styles based on scroll position
  const bgColor = useColorModeValue(
    scrolled ? "rgba(255, 255, 255, 0.8)" : "#faf6f5",
    scrolled ? "rgba(26, 32, 44, 0.85)" : "gray.800"
  );

  const boxShadow = scrolled
    ? "0 4px 20px rgba(0, 0, 0, 0.08)"
    : "0 1px 3px rgba(0, 0, 0, 0.05)";

  const transition = "all 0.3s ease";
  const height = scrolled ? "14" : "16";
  const py = scrolled ? 2 : 4;
  const backdropFilter = scrolled ? "blur(10px)" : "none";

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="100"
      borderBottomWidth="1px"
      bg={bgColor}
      shadow={boxShadow}
      transition={transition}
      backdropFilter={backdropFilter}
      style={{
        WebkitBackdropFilter: backdropFilter === "none" ? "none" : "blur(10px)",
      }}
    >
      <Flex
        width="100%"
        flexDirection="column"
        marginX="auto"
        maxWidth="container.lg"
        px={{ base: 4, md: scrolled ? 8 : 6 }}
        transition={transition}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          py={py}
          height={height}
          transition={transition}
        >
          <Flex
            role="group"
            as={Link}
            href="/"
            alignItems="center"
            fontWeight="bold"
            fontSize={scrolled ? "xl" : "2xl"}
            transition={transition}
          >
            <Icon
              transition={transition}
              _groupHover={{ color: "brand.500" }}
              as={IoIosFlash}
              mr={2}
              boxSize={scrolled ? "5" : "6"}
            />
            <Text
              display={{ base: "none", sm: "inherit" }}
              transition={transition}
            >
              KIBewerbungsfotos.de
            </Text>
          </Flex>

          {user && (
            <HStack
              spacing={scrolled ? 2 : 4}
              display={{ base: "flex", md: "flex" }}
              transition={transition}
            >
              <Button
                as={Link}
                href="/overview"
                variant="ghost"
                size="sm"
                fontWeight="medium"
                _hover={{ color: "brand.500" }}
                py={scrolled ? 1 : 2}
                transition={transition}
              >
                Dashboard
              </Button>

              <HStack spacing={4} transition={transition}>
                {dodoIsConfigured && (
                  <Box transition={transition}>
                    <ClientSideCredits creditsRow={credits ? credits : null} />
                  </Box>
                )}

                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={
                      <Avatar
                        size={scrolled ? "xs" : "sm"}
                        bg="brand.500"
                        color="white"
                        name={user.email}
                        transition={transition}
                      />
                    }
                    variant="ghost"
                    aria-label="User menu"
                    size={scrolled ? "xs" : "sm"}
                    rounded="full"
                    transition={transition}
                  />
                  <MenuList zIndex="101">
                    <Text
                      px={3}
                      py={2}
                      fontWeight="medium"
                      color="brand.500"
                      textAlign="center"
                      isTruncated
                    >
                      {user.email}
                    </Text>
                    <MenuDivider />
                    <form action="/overview/payment" method="post">
                      <MenuItem
                        as="button"
                        type="submit"
                        icon={<Icon as={IoIosFlash} />}
                      >
                        Credits kaufen
                      </MenuItem>
                    </form>
                    <MenuDivider />
                    <form action="/auth/sign-out" method="post">
                      <MenuItem
                        as="button"
                        type="submit"
                        icon={<Icon as={HiLogout} />}
                      >
                        Ausloggen
                      </MenuItem>
                    </form>
                  </MenuList>
                </Menu>
              </HStack>
            </HStack>
          )}

          {!user && (
            <HStack spacing={2} transition={transition}>
              <Button
                as={Link}
                href="/#pricing"
                colorScheme="beige"
                variant="link"
                mr={4}
                size="sm"
                transition={transition}
              >
                Kosten
              </Button>

              <Button
                as={Link}
                href="/login"
                colorScheme="beige"
                variant="brand"
                size="sm"
                rightIcon={<HiArrowRight />}
                shadow="md"
                py={scrolled ? 1 : 2}
                transition={transition}
              >
                Erstellen
              </Button>

              <Button
                as={Link}
                href="/login"
                variant="ghost"
                colorScheme="beige"
                size="sm"
                py={scrolled ? 1 : 2}
                transition={transition}
              >
                Anmelden
              </Button>
            </HStack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
