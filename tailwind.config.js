/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./puliic/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
