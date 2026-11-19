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
          secondary: '#0D1424',
          section: '#101A2D',
          card: 'rgba(255,255,255,0.045)',
          'card-hover': 'rgba(255,255,255,0.065)',
          border: 'rgba(255,255,255,0.09)',
          'border-hover': 'rgba(255,255,255,0.15)',
        },
        navy: {
          DEFAULT: '#14213D',
          900: '#14213D',
          800: '#1D2E54',
          700: '#263C6D',
          950: '#0C1527',
        },
        brand: {
          blue: '#2563EB',
          'blue-hover': '#3B82F6',
          'blue-light': 'rgba(37, 99, 235, 0.15)',
          'blue-subtle': 'rgba(37, 99, 235, 0.08)',
          violet: '#A78BFA',
          'violet-light': 'rgba(167, 139, 250, 0.12)',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#A6B2C5',
          muted: '#64748B',
          subtle: '#475569',
          accent: '#60A5FA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        'card': '0 4px 24px -4px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 12px 40px -8px rgba(0, 0, 0, 0.5)',
        'elevated': '0 20px 50px -12px rgba(0, 0, 0, 0.6)',
        'glow-blue': '0 0 40px -8px rgba(37, 99, 235, 0.15)',
        'glow-violet': '0 0 40px -8px rgba(167, 139, 250, 0.1)',
      },
      backgroundImage: {
        'radial-blue': 'radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)',
        'radial-violet': 'radial-gradient(ellipse at 80% 20%, rgba(167, 139, 250, 0.05) 0%, transparent 50%)',
        'radial-center': 'radial-gradient(ellipse at 50% 50%, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
