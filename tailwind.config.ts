import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        mobile: "url('/background/background-mobile.jpg')",
        desktop: "url('/background/background-desktop.jpg')",
        "firefly-radial":
          "radial-gradient(50% 50% at 50% 50%, rgba(253, 255, 80, 0.6) 40%, rgba(217,217,217, 0) 100%)",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "rotate(0deg)" }, // Starting and ending positions
          "25%": { transform: "rotate(-3deg)" }, // Rotate left slightly
          "50%": { transform: "rotate(3deg)" }, // Rotate right slightly
          "75%": { transform: "rotate(-3deg)" }, // Rotate left again slightly
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out", // Softer and slower shake
      },
    },
  },
  plugins: [],
};
export default config;
