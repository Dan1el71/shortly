/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0d1117",
        lightDark: "#161b22",
      }
    },
  },
  plugins: [],
}

