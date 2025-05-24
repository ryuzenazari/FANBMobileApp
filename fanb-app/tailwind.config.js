/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4f6bff",
          DEFAULT: "#3f51b5",
          dark: "#2c387e",
        },
        secondary: {
          light: "#33eb91",
          DEFAULT: "#00e676",
          dark: "#00a152",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 