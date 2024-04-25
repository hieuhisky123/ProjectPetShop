// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        borderColor: "#CACACA",
        buttonColor: "#618DFF",
        homePink: "#F8E9D8",
      },
      lineHeight: {
        '54': '54.47px',
      },
      backgroundImage: {
        inCategory: "url('/src/assets/imgs/category.svg')",
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform' : 'translateY(8px);',
            transform: 'translateY(8px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.2s linear both;'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true, // Bật lại preflight
  },
};
