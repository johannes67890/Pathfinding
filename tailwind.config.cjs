/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      animation: {
        "visited-cell": "upscale 400ms ease-in both",
      },
      keyframes: {
        upscale: {
          "0%": {
            transform: "scale(0.5)",
          },
          "20%": {
            backgroundColor: "orange",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "blue",
          },
        },
      },
    },
  },
  plugins: [],
}
