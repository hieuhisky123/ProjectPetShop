/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        borderColor: "#CACACA",
        buttonColor: "#618DFF",
        homePink: "#F8E9D8",
      },
      backgroundImage: {
        inCategory: "url('/src/assets/imgs/category.svg')",
      },
    },
  },
  plugins: [],
};
