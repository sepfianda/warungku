/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#00B496",
        secondary: "#436AF1",
        tertiary:  "#C34B40",
        neutral:   "#F6F6FC",
        safe:      "#00B496",
        warning:   "#D97706",
        danger:    "#C34B40",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}