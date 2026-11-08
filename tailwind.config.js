/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          maroon: '#6b0f1a',
          maroonDark: '#4a070f',
          crimson: '#8b0000',
          gold: '#d4af37',
          goldLight: '#f3e5ab',
          goldDark: '#aa820a',
          cream: '#fffdf7',
          paper: '#faf6ee',
          saffron: '#ff7722',
          sand: '#f4ede1'
        }
      },
      fontFamily: {
        sans: ['"Anek Bangla"', '"Hind Siliguri"', 'sans-serif'],
        bengali: ['"Anek Bangla"', '"Hind Siliguri"', 'sans-serif'],
        serif: ['"Anek Bangla"', '"Hind Siliguri"', 'serif'],
        sanskrit: ['"Anek Bangla"', '"Hind Siliguri"', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
