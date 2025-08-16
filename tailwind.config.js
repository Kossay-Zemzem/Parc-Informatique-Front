/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}","./src/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"inter"', 'sans-serif'], //default font is inter
        'poppins': ['"Poppins"', 'sans-serif'],
        'inter': ['"Inter"', 'sans-serif']
      },
    }
  },
  plugins: [],
}

