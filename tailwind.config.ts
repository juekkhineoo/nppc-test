import {heroui} from "@heroui/react";
import type {Config} from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        mtest: "#52525B", //Use text-mtest, bg-mtest to apply,
        lightMapSeaColor: "#97DBF2"
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        serif: defaultTheme.fontFamily.serif,
        mono: defaultTheme.fontFamily.mono
      },
      keyframes: {
        fadeOut: {
          "0%": {
            opacity: "1",
            backgroundColor: "#006FEE"
          },
          "100%": {
            opacity: "1"
          }
        }
      },
      animation: {
        fadeOut4s: "fadeOut 4s ease-in-out"
      }
    }
  },
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
        dark: {
          extend: "dark",
          colors: {
            background: "#1D252D",
            foreground: "#ffffff",
            // divider: "red",
            overlay: "#27272A",
            // focus: "green",
            content1: "#18181B",
            // content2: "blue",
            // content3: "orange",
            // content4: "pink",

            default: {
              // 50: "white",
              100: "#2B3648",
              200: "#313C4E",
              300: "#71717A",
              // 400: "green",
              // 500: "purple",
              // 600: "yellow",
              // 700: "chartreuse",
              // 800: "navy",
              // 900: "gold",
              DEFAULT: "#2B3648"
            }
          },
          layout: {
            disabledOpacity: 0.7,
            radius: {
              small: "2px",
              medium: "4px",
              large: "6px"
            }
          }
        }
      }
    })
  ]
};
export default config;
