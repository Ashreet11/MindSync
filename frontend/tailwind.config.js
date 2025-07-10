/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        auraBlue: '#dbeafe',
        auraGreen: '#d1fae5',
        auraLavender: '#ede9fe',
        auraGray: '#f1f5f9',
        brandBlue: '#5465FF',       
        brandSlate: '#334155',      
      },
    },
  },
  plugins: [],
}
