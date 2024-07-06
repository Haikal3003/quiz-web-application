/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      colors: {
        darkTheme: {
          primary: '#242632',
          secondary: '#32353f',
          gray: '#44474e',
          lightGreen: '#85b899',
        },

        lightTheme: {
          primary: '#f8f8f8',
          gray: '#878787',
          lightGreen: '#018535',
          darkGreen: '#007927',
          yellow: '#f5d133',
        },
      },
    },
  },
  plugins: [],
};
