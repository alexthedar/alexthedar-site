/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chaos: {
          purple: '#6B46C1',
          blue: '#2563EB',
          amber: '#F59E0B',
        },
        calm: {
          dark: '#1F2937',
          gray: '#6B7280',
          light: '#F3F4F6',
        }
      },
      animation: {
        'count-up': 'count-up 1s ease-out',
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
      keyframes: {
        'count-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}