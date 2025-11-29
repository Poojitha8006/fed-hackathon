import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#baddff',
          300: '#8cc7ff',
          400: '#54aaff',
          500: '#1f8dff',
          600: '#0a6fe3',
          700: '#0757b3',
          800: '#06478f',
          900: '#063c75'
        }
      }
    }
  },
  plugins: []
} satisfies Config

