/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#090A0F',
          bg: '#090A0F',
          surface: '#111319',
          card: '#12141C',
          'card-elevated': '#181B26',
          'card-hover': '#1E2230',
          secondary: '#151822',
          subtle: '#1C202E',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.16)',
          'border-active': 'rgba(16, 185, 129, 0.4)',
        },
        brand: {
          emerald: '#10B981',
          'emerald-light': '#34D399',
          'emerald-hover': '#059669',
          'emerald-subtle': 'rgba(16, 185, 129, 0.12)',
          blue: '#10B981', // Map legacy blue to emerald for seamless consistency
          'blue-light': '#34D399',
          'blue-hover': '#059669',
          'blue-glow': 'rgba(16, 185, 129, 0.15)',
          violet: '#8B5CF6',
          'violet-light': '#A78BFA',
          green: '#10B981',
          orange: '#F59E0B',
          amber: '#F59E0B',
          rose: '#F43F5E',
          red: '#F43F5E',
        },
        text: {
          main: '#F8FAFC',
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
          subtle: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'fintech-subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        'fintech-card': '0 4px 20px -2px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'fintech-glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.2)',
        'fintech-glow-blue': '0 0 30px -5px rgba(16, 185, 129, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
