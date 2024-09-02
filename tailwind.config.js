/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        puple: "#8F5BBD",
        red: "#D34D4D",
        black: "#000",
        white: "#fff",
        lightgray: "#BEBEBE",
        sizegray: "#959595",
      },
    },
  },
  plugins: [],
};
