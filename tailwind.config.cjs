/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      animation: {
        "visited-cell": "upscale 400ms ease-in both",
        "shortest-path": "upscaleShortest 400ms ease-in both",
        "reset": "reset 400ms ease-in both",
      },
      keyframes: {
        upscale: {
          "0%": {
            transform: "scale(0.25)",
          },
          "20%": {
            backgroundColor: "orange",
          },
          
          "100%": {
            transform: "scale(1)",
            backgroundColor: "blue",
          },
        },
        upscaleShortest: {
          "0%": {
            transform: "scale(0.25)",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "orange",
          },
        },
        reset: {
          "0%": {
            transform: "scale(1)",
            backgroundColor: "blue",
          },
          "100%": {
            transform: "scale(0.25)",
            backgroundColor: "white",
          },
        }
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
