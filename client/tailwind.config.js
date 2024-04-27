// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        borderColor: "#CACACA",
        buttonColor: "#618DFF",
        homePink: "#F8E9D8",
        'bg-custom': '#CFF1F1',
        'bg-ct': '#E6FCB9;',
        'bg-user': '#D48D6C'

      },
      backgroundColor: {
        overlay: 'rgba(0,0,0,0.7)'
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
        },
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-1000px);',
                    transform: 'translateX(-1000px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
                    transform: 'translateX(0);'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.2s linear both;',
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true, // Bật lại preflight
  },
};
