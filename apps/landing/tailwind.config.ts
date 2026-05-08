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
        // Milky-white canvas. No more cream / beige.
        canvas: "#FBFAF7",
        canvas2: "#F4F2EC", // tonal step for alternating bands.
        ink: "#15171A",
        ink2: "#2A2D31", // softer ink for body copy.
        copper: "#B84423", // slightly desaturated, more sophisticated.
        copper2: "#92341B",
        slate: "#5A6066",
        sage: "#5F7758",
        line: "rgba(21, 23, 26, 0.08)", // hairline neutral.
        line2: "rgba(21, 23, 26, 0.14)", // slightly stronger hairline.
      },
      fontFamily: {
        // PP Editorial New replacement → keep Fraunces (variable serif) but tighter axis.
        display: ['"Fraunces"', "Georgia", "serif"],
        // Banned: Inter. Replacement: Cabinet Grotesk for body + UI.
        sans: ['"Cabinet Grotesk"', '"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "1240px",
        narrow: "1120px",
      },
      boxShadow: {
        // Diffusion shadow — wide, gentle, copper-tinted for warm depth.
        diffusion:
          "0 1px 0 0 rgba(21, 23, 26, 0.04), 0 24px 48px -28px rgba(184, 68, 35, 0.08), 0 8px 24px -16px rgba(21, 23, 26, 0.05)",
        // Inner highlight for the double-bezel inner core (light-side micro-bevel).
        inset: "inset 0 1px 0 0 rgba(255, 255, 255, 0.7)",
        // Hairline ring substitute for cards.
        hairline: "0 0 0 1px rgba(21, 23, 26, 0.06)",
      },
      borderRadius: {
        bezel: "1.5rem", // outer shell.
        bezelInner: "1.125rem", // inner core (concentric).
        pill: "999px",
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
