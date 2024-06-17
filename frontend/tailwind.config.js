/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      colors: {
        dark: '#151818',
        lightGreen: '#C1FF69',
        darkBlue: '#414AC8',
        lightBlue: '#DCE1FF',
      },
    },
  },
  plugins: [],
};
