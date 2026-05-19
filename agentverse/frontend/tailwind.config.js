/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#07070F',
        surface: 'rgba(20, 20, 35, 0.4)',
        border: 'rgba(255, 255, 255, 0.08)',
        primary: '#FFFFFF',
        secondary: '#A1A1AA',
        accent: {
          astrologer: '#8B5CF6',
          education: '#10B981',
          finance: '#F59E0B',
          makeup: '#EC4899',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glow-astrologer': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-education': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-finance': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-makeup': '0 0 20px rgba(236, 72, 153, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
