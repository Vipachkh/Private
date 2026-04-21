import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#F9F6F0',   // Warm Off-White
          orange: '#D46F4D',  // Vintage Burnt Orange
          brown: '#5E3D2C',   // Classic Wood/Coffee Brown
          dark: '#3A261D',    // Deep Brown for text
          light: '#FFFDF9',   // Purest warm white
          yellow: '#F4B400',  // Summer yellow
          sky: '#87CEEB',     // Summer sky blue
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Prompt"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
