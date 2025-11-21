/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
    },
    boxShadow:{
        custom: "0 10px 35px rgba(0,0,0,0.08)",
    }
  },
},
   safelist: [
    { pattern: /bg-(sky|green|red|cyan|indigo|violet|purple|fuchsia|emerald|lime|teal|amber|rose)-(100|200|300|400|500|600|700|800|900)/ },
     { pattern: /border-(sky|green|red|cyan|indigo|violet|purple|fuchsia|emerald|lime|teal|amber|rose)-(100|200|300|400|500|600|700|800|900)/ },
     { pattern: /text-(sky|green|red|cyan|indigo|violet|purple|fuchsia|emerald|lime|teal|amber|rose)-(100|200|300|400|500|600|700|800|900)/ },
  ],
  plugins: [],
}

