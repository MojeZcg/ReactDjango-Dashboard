/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
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

    function ({ addUtilities }) {
      const extendUnderline = {
        ".underline": {
          textDecoration: "underline",
          "text-decoration-color": "#EABE3F",
        },
      };
      addUtilities(extendUnderline);
    },
  ],
};
