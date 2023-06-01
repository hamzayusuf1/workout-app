/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      workout: {
        secondary: "#0C1729",
        primary: "#91E03D",
        tertiary: "#282c34",
        900: "bg-red-500",
      },
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
