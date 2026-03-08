/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f5984d",
        accent: "#f39849",
        "background-light": "#f8f7f6",
        "background-dark": "#221810",
        "chart-protein": "#5C8CE4",
        "chart-carbs": "#27AE60",
        "chart-fat": "#E2B15B",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "1.5rem",
        xl: "3rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
