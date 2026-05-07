import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6F0",
        // Slightly darker band used for alternating sections.
        cream2: "#F2EBDF",
        ink: "#1F2526",
        copper: "#C2462A",
        // Deepened copper used for hover.
        copper2: "#9F3520",
        slate: "#5C6266",
        sage: "#6F8869",
        sky: "#3A6E8F",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "1180px",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(31, 37, 38, 0.06)",
        // Soft sticker-shadow for the receiver-card mockups.
        receiver: "6px 6px 0 0 rgba(31, 37, 38, 0.10)",
      },
      borderRadius: {
        card: "10px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
