import type { Config } from "tailwindcss";

const config: Config = {
  // Dark mode via class strategy (kita kontrol manual via localStorage)
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // Color palette terinspirasi Google AI Studio — clean, tidak generik
      colors: {
        // Permukaan utama dark mode
        surface: {
          DEFAULT: "#0f0f0f",   // background utama
          "50":  "#fafafa",
          "100": "#f5f5f5",
          "800": "#1e1e1e",     // sidebar
          "900": "#131313",     // panel
          "950": "#0a0a0a",     // deepest bg
        },
        // Accent biru Gemini — bukan biru generik
        gem: {
          DEFAULT: "#4285F4",
          "400": "#669DF6",
          "500": "#4285F4",
          "600": "#1A73E8",
          "700": "#1557B0",
        },
        // Border halus untuk dark mode
        border: {
          DEFAULT: "#2a2a2a",
          light: "#e0e0e0",
        },
        // Teks hierarki
        ink: {
          DEFAULT: "#e8eaed",
          muted: "#9aa0a6",
          subtle: "#5f6368",
        },
      },

      fontFamily: {
        // Google Sans sebagai display + sans-serif fallback
        sans: ["Google Sans", "Inter", "system-ui", "sans-serif"],
        // Monospace untuk kode
        mono: ["JetBrains Mono", "Fira Code", "Menlo", "monospace"],
      },

      // Animasi streaming teks
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-gem": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(66,133,244,0)" },
          "50%":       { boxShadow: "0 0 0 6px rgba(66,133,244,0.15)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to:   { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in":      "fade-in 0.2s ease-out",
        "cursor-blink": "blink-cursor 1s ease-in-out infinite",
        "slide-left":   "slide-in-left 0.2s ease-out",
        "pulse-gem":    "pulse-gem 2s ease-in-out infinite",
        shimmer:        "shimmer 2s linear infinite",
      },

      // Scrollbar styling
      screens: {
        xs: "480px",
      },
    },
  },

  plugins: [],
};

export default config;
