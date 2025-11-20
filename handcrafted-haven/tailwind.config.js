/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      primary: { DEFAULT: "#44AF69" },
      accentRed: { DEFAULT: "#F8333C" },
      accentYellow: { DEFAULT: "#FCAB10" },
      accentBlue: { DEFAULT: "#2B9EB3" },
      neutralLight: { DEFAULT: "#DBD5B5" },
    },
    fontFamily: {
      sans: ["var(--font-inter)", "sans-serif"],
      roboto: ["var(--font-roboto)", "sans-serif"],
    },
  },
  plugins: [],
};
