/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'lx': '1080px',
      // custom size for col breaks

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "bg-pri": "#4ade80",
        "bg-sec": "#15803d",
        "bg-tri": "#10b981",
        "txt-pri": "#14532d",
        "txt-sec": "#f0fdf4",
      },
    },
  },
  plugins: [],
};
