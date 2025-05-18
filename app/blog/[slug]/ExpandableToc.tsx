"use client";
import { useState } from "react";
import { VStack, Button, Collapse, Link as ChakraLink } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function ExpandableToc({
  toc,
}: {
  toc: { id: string; text: string; level: number }[];
}) {
  const [open, setOpen] = useState(false);
  const handleTocClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Optionally update the hash in the URL
      window.history.replaceState(null, "", `#${id}`);
    }
  };
  return (
    <>
      <Button
        onClick={() => setOpen((v) => !v)}
        variant="ghost"
        size="sm"
        color="gray.700"
        fontWeight="bold"
        leftIcon={open ? <ChevronDownIcon /> : <ChevronRightIcon />}
        mb={2}
        _hover={{ bg: "gray.50" }}
        aria-expanded={open}
        aria-controls="toc-list"
      >
        Inhaltsverzeichnis
      </Button>
      <Collapse in={open} animateOpacity>
        <VStack id="toc-list" align="start" spacing={1} fontSize="sm" mt={1}>
          {toc.map((item, idx) => (
            <ChakraLink
              key={item.id + idx}
              href={`#${item.id}`}
              color="gray.700"
              borderRadius="md"
              px={2}
              py={1}
              _hover={{
                color: "gray.900",
                textDecoration: "underline",
                bg: "gray.50",
              }}
              pl={item.level === 3 ? 4 : 0}
              transition="background 0.2s"
              onClick={(e) => handleTocClick(e, item.id)}
            >
              {item.text}
            </ChakraLink>
          ))}
        </VStack>
      </Collapse>
    </>
  );
}
