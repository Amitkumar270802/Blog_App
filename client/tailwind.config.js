/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      50: 50,
      75: 75,
      100: 100,
      auto: "auto",
    },
    screens: {
      qs: { max: "479px" },
      sm: { min: "480px" },
      md: { min: "768px" },
      lg: { min: "976px" },
      xl: { min: "1440px" },
    },
  },
  plugins: [],
};
