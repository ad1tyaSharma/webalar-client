/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        background:{
          200: "#ED1250",
          300:"#be0e40",
          400 :"#071945",
          500 : '#051232'
        }
      }
    },
  },
  plugins: [],
}

