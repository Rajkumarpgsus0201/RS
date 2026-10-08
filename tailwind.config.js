/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          // Vedhas Culture Rich Palette
          primary: '#016935',      // Royal deep emerald
          primaryHover: '#01522a',
          primaryLight: '#299E60', // Vibrant jewel green
          secondary: '#73B58A',    // Sage mint green
          accent: '#FA6800',       // Warm sunset amber / orange
          accentHover: '#e05d00',
          gold: '#FFB703',         // Rich heritage gold
          cream: '#FFFBF4',        // Warm ivory cream
          mintCream: '#F3FAF2',    // Subtle tinted mint
          
          // Rich Midnight Navy / Dark Surfaces (replacing generic pitch black)
          black: '#0A0D1B',
          dark: '#121535',         // Vedhas culture signature neutral
          surface: '#161C3D',
          elevated: '#1E254E',
          border: '#2A3362',
          borderLight: '#3D4884',
          muted: '#94A0C5',
          light: '#F8FAF7',
          chalk: '#EAEFE9',

          // Compatibility aliases for vibrant accent states
          volt: '#299E60',         // Vibrant emerald green as primary highlight
          orange: '#FA6800',       // Rich amber orange
          crimson: '#E61937',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        heading: ['Outfit', 'Exo', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Quicksand', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.02em',
        wide: '0.05em',
        widest: '0.15em',
        ultra: '0.25em',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glow-primary': '0 0 30px -5px rgba(1, 105, 53, 0.45)',
        'glow-green': '0 0 25px -5px rgba(41, 158, 96, 0.4)',
        'glow-accent': '0 0 25px -5px rgba(250, 104, 0, 0.4)',
        'card-rich': '0 20px 45px -15px rgba(10, 13, 27, 0.85)',
      }
    },
  },
  plugins: [],
}
