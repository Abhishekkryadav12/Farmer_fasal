/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#16a34a',
        'brand-light-green': '#dcfce7',
        'brand-earth': '#854d0e',
        'brand-yellow': '#eab308'
      }
    },
  },
  plugins: [],
}
