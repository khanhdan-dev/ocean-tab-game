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
        "wrap-net": {
          "0%": { transform: "scale(1.4)", opacity: "1" },
          "25%": { transform: "scale(1.3)", opacity: "1" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "75%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out", // Softer and slower shake
        "wrap-net": "wrap-net 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
