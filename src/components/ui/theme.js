import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6f2ff" },
          100: { value: "#e6f2ff" },
          200: { value: "#bfdeff" },
          300: { value: "#99caff" },
          950: { value: "#001a33" },
        },
      },
      fonts: {
        inter: { value: "'Inter', sans-serif" },
        poppins: { value: "'Poppins', sans-serif" },
      },
    },
  },
});

export default createSystem(defaultConfig, config);
