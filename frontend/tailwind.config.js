const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: { 950: "#141414", ...colors.neutral },
        primary: "#970CA4",
        secondary: "#F9D70B",
      },
      lineHeight: {
        inherit: "inherit",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.825rem",
      },
      strokeWidth: {
        1.25: 1.25,
        1.5: 1.5,
        1.75: 1.75,
        2.25: 2.25,
        2.5: 2.5,
        2.75: 2.75,
        3: 3,
        3.25: 3.25,
      },
    },
  },
  plugins: [],
};
