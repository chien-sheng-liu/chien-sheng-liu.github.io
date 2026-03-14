/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        aurora: 'aurora 60s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translateY(0%) rotate(0deg)' },
          '50%': { transform: 'translateY(20%) rotate(180deg)' },
          '100%': { transform: 'translateY(0%) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
