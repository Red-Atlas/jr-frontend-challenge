/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Avenir Next", "sans-serif"],
      },
      colors: {
        primary: "#D31216",
        secondary: "#444444",
      },
    },
  },
  plugins: [],
};
