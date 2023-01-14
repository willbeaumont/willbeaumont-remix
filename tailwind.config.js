/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-pri": "#4ade80",
        "bg-sec": "#15803d",
        "txt-pri": "#14532d",
        "txt-sec": "#f0fdf4",
      },
    },
  },
  plugins: [],
};
