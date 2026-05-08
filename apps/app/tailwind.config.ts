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
        canvas: "#FFFFFF",
        "canvas-2": "#F9FAFB",
        ink: "#111827",
        "ink-2": "#1F2937",
        slate: "#6B7280",
        line: "rgba(17,24,39,0.08)",
        "line-2": "rgba(17,24,39,0.14)",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  plugins: [],
} satisfies Config;
