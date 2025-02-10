/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'allroad-red': '#C41E3A',
        'table-gray': '#E5E5E5',
      },
      fontSize: {
        '10px': '10px',
      }
    },
  },
};
