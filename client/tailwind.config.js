/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      colors: {
        'brown': '#593C2C',
        'gray':'#A68F81',
        'nude':'#F2B56B',
        'white':'#fffbeb',
        'pink':'#F29472'
       
      },
      extend: {},
    },
    screens: {
      sm: { min: "200px" },
    },
    plugins: [require("daisyui")],
  };
  