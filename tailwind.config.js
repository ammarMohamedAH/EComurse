/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      xs:'400px',
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1560px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily:{
        'mainfont':'"Encode Sans Expanded", sans-serif',
      }
    },
    aspectRatio: {
      '4/3': '3 / 4',
    },

    boxShadow:{
      "shadow": 'rgba(145,158,171,.2) 0px 2px 4px -1px,rgba(145,158,171,.14) 0px 4px 5px 0px,rgba(145,158,171,.12) 0px 1px 10px 0px;'
    },
    // colors:{
    //   'main-color':'#0aad0a',
    //   'light-color':'#f0f3f2',
    //   'rating-color':'#ffc908',
    // },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode:"class",
}

