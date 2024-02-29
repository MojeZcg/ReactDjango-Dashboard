/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          50: "#fdfcff",
          100: "#f1e9fe",
          200: "#e5d7fc",
          300: "#d8c5fb",
          400: "#ccb2fa",
          500: "#c0a0f9",
          600: "#b48df7",
          700: "#a87bf6",
          800: "#9c69f5",
          900: "#8344f2",
          950: "#6b1ff0",
        },
        "main-darkest": {
          50: "#6010eb",
          100: "#580fd9",
          200: "#510dc7",
          300: "#490cb4",
          400: "#420ba2",
          500: "#3b0a90",
          600: "#33097d",
          700: "#240659",
          800: "#1d0546",
          900: "#150434",
          950: "#06010f",
        },
        oro: "#e6b219",
        dark: "#111114",
        primary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      backgroundImage: {
        "gradient-secundary":
          "  linear-gradient(301deg, #ffffff 37%, #E6B21970 100%)",
        "gradient-secundary2":
          "conic-gradient(at 100% 100%, rgb(255, 255, 255), rgb(254, 249, 195), rgb(255, 255, 255))",
        "gradient-dark": "linear-gradient(300deg, #000000 66%, #E6B2195f 100%)",
      },
    },
    fontFamily: {
      Main: ["Onest", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
