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
          DEFAULT: '#080D1A',
          bg: '#080D1A',
          secondary: '#0D1424',
          card: '#111C30',
          'card-elevated': '#16233A',
          'card-hover': '#1A2942',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.16)',
          'border-active': 'rgba(59, 130, 246, 0.4)',
        },
        brand: {
          blue: '#3B82F6',
          'blue-light': '#60A5FA',
          'blue-hover': '#2563EB',
          'blue-glow': 'rgba(59, 130, 246, 0.15)',
          violet: '#8B5CF6',
          'violet-light': '#A78BFA',
          'violet-glow': 'rgba(139, 92, 246, 0.15)',
          green: '#22C55E',
          'green-glow': 'rgba(34, 197, 94, 0.15)',
          orange: '#F59E0B',
          red: '#EF4444',
        },
        text: {
          main: '#F8FAFC',
          secondary: '#A6B2C5',
          muted: '#64748B',
          subtle: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'fintech-subtle': '0 2px 8px -2px rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
        'fintech-card': '0 8px 30px -4px rgba(8, 13, 26, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'fintech-glow-blue': '0 0 40px -10px rgba(59, 130, 246, 0.25)',
        'fintech-glow-violet': '0 0 40px -10px rgba(139, 92, 246, 0.25)',
        'fintech-glow-green': '0 0 40px -10px rgba(34, 197, 94, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
