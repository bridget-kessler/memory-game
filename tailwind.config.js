/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const colors = require('@mui/material/colors'); // for mui v4

// Register static utility styles for backface visibility
const backfaceVisibility = plugin( ({addUtilities}) => {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    }
  })
});

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'cards': 'repeat(auto-fit, minmax(min(100%, 6rem), 6rem))',
      },
      gridTemplateRows: {
        'gameboard': 'auto 1fr',
        'loading-screen': '1fr auto',
        'cards': `repeat(auto-fill, 6rem)`,
      },
      boxShadow: {
        'button': '12px 12px 0px 0px rgba(0, 0, 0, 1)',
      },
      TransitionEvent: {
        card: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1);'
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        'giant': '15rem',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', "sans-serif"],
      },
      colors: {
        'stone': '#e6e1dd',
      }
    },
  },
  plugins: [ backfaceVisibility ],
}

