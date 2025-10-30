/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8DC',
          100: '#F4E4A6',
          200: '#FFD700',
          300: '#D4AF37',
          400: '#C48A5B',
          500: '#8B4513',
          600: '#3D2817',
          700: '#2C1810',
          800: '#1C1C1C',
          900: '#0A0B0A',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
