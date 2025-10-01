/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // adjust if using /pages or /components
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        verdana: ['Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
