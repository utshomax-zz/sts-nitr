const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
    extend: {
      
    },
    screens: {
      'xs': '340px',
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
