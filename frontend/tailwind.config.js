const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.stone,
        primary: "#f20505",
        secondary: "#f9d70b",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
      },
    },
  },
  plugins: [],
};
