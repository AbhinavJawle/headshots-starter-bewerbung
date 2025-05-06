import { inter } from "@/components/Providers";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#E6F7FF",
      100: "#BAE7FF",
      200: "#91D5FF",
      300: "#69C0FF",
      400: "#40A9FF",
      500: "#3dacec",
      600: "#1890FF",
      700: "#096DD9",
      800: "#0050B3",
      900: "#003A8C",
    },
    beige: {
      50: "#D7D5D4",
      100: "#CDCACA",
      200: "#B9B6B5",
      300: "#A5A1A0",
      400: "#918D8B",
      500: "#7D7876",
      600: "#605C5B",
      700: "#434140",
      800: "#262524",
      900: "#0A0909",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#faf6f5",
      },
    },
  },
  fonts: {
    heading: `'${inter.style.fontFamily}', sans-serif`,
    body: `'${inter.style.fontFamily}', sans-serif`,
  },
  components: {
    Button: {
      variants: {
        brand: {
          transition: "all 0.2s",
          bg: "brand.500",
          color: "white",
          shadow: "lg",
          borderWidth: "1px",
          borderColor: "brand.400",
          _hover: {
            bg: "brand.600",
            shadow: "md",
            transform: "translateY(-2px)",
          },
        },
        outline: {
          transition: "all 0.2s",
          _hover: {
            transform: "translateY(-2px)",
            shadow: "sm",
          },
        },
      },
    },
    Link: {
      variants: {
        brand: {
          transition: "all 0.2s",
          bg: "brand.500",
          color: "white",
          shadow: "lg",
          borderWidth: "1px",
          borderColor: "brand.400",
          _hover: {
            bg: "brand.600",
            shadow: "md",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: "brand.500",
      },
    },
  },
});

export default theme;
