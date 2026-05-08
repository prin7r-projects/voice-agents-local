import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FBFAF7",
        "canvas-2": "#F4F2EC",
        ink: "#15171A",
        "ink-2": "#2A2D31",
        copper: "#B84423",
        "copper-2": "#92341B",
        slate: "#5A6066",
        sage: "#5F7758",
        line: "rgba(21,23,26,0.08)",
        "line-2": "rgba(21,23,26,0.14)",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Cabinet Grotesk", "Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "10px",
        sticker: "14px",
      },
    },
  },
  plugins: [],
} satisfies Config;
