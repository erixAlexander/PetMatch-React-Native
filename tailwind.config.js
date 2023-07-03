const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        "custom-main": "#fe3072",
        "custom-light-red": "#fb4a40",
        "custom-white": "#fefcfb",
        "custom-dark-gray": "#5f5f6c",
        "custom-light-gray": "#f7f7f7",
        "custom-border-gray": "#eeeeee",
        "custom-footer-bg": "#1d2124",
      },
    },
  },
};
