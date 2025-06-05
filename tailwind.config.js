/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#F7EED9',
        cream: '#FFF5E6',
        oliveGreen: '#DDE4D6',
        golden: '#D4AF37',
        darkBlue: '#132C57',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, black, coral, black)',
        'dark-gradient': 'linear-gradient(to right, #2196F3 1%, black 15%, #132C57, black 85%, #2196F3 99%)',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        poppins: ['Poppins']
      },
      textShadow: {
        yellowGlow: '1px 1px 4px red',
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
  plugins: [],
}
