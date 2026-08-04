import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        background: "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        foreground: "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      maxWidth: {
        site: "1200px",
      },
    },
  },
  plugins: [typography],
};

export default config;
