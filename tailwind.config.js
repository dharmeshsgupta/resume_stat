/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          400: '#ffb000',
          500: '#ff9f00',
        },
        cyber: {
          teal: '#00f0ff',
        },
        dark: {
          900: '#0b0b0f',
          800: '#121214',
          700: '#1c1c1f',
        }
      },
      fontFamily: {
        mono: ['monospace', 'Courier New', 'ui-monospace'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
