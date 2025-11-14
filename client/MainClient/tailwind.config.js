/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
    fontFamily: {
      roobert: ['Roobert', 'sans-serif'],
    },
  },
},
   safelist: [
    { pattern: /bg-(sky|green|red|cyan|indigo|violet|purple|fuchsia|emerald|lime|teal|amber|rose)-(100|200|300|400|500|600|700|800|900)/ },
     { pattern: /border-(sky|green|red|cyan|indigo|violet|purple|fuchsia|emerald|lime|teal|amber|rose)-(100|200|300|400|500|600|700|800|900)/ },
     { pattern: /text-(sky|green|red|cyan|indigo|violet|purple|fuchsia|emerald|lime|teal|amber|rose)-(100|200|300|400|500|600|700|800|900)/ },
  ],
  plugins: [],
}

