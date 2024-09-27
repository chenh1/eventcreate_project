/** @type {import('tailwindcss').Config} */
module.exports = {
  //purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "./index.html",
    "./storybook/**/*.{js,ts,jsx,tsx,html}",
    "./public/**/*.{js,ts,jsx,tsx,html}",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx,html}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        plump: {
          '100%': { width: '106%', height: '112%', transform: 'translate(-3%, -6%)' },
          '50%': { width: '110%', height: '120%', transform: 'translate(-5%, -10%)' },
          '0%': { width: '100%', height: '100%', transform: 'translate(0%, 0%)' },
        },
        shrinkbounce: {
          '0%':{ transform: 'scale(1)'},
          '33%': { transform: 'scale(.85)'},
          '100%': { transform: 'scale(1)' }
        },
        check: {
          '0%': { width: '0', height: '0', "border-color": "#050E1C", transform: "translate3d(0,-.5em,0) rotate(45deg)" },
          "33%": { width: '7px', height: '0', transform: 'translate3d(0,-.5em,0) rotate(45deg)' },
          "100%": { width: '7px', height: '14px', "border-color": '#050E1C', transform: 'translate3d(0,-.5em,0) rotate(45deg)' }
        },
        hamburgertochevronleft: {
          '0%': { transform: 'rotate(0deg) translate(0, 0)' },
          '100%': { transform: 'rotate(45deg) translate(1px, 21px)' }
        },
        hamburgertochevronright: {
          '0%': { transform: 'rotate(0deg) translate(0, 0)' },
          '100%': { transform: 'rotate(-45deg) translate(-2px, 3px)' }
        },
        hamburgertochevronleftreverse: {
          '100%': { transform: 'rotate(0deg) translate(0, 0)' },
          '0%': { transform: 'rotate(45deg) translate(1px, 21px)' }
        },
        hamburgertochevronrightreverse: {
          '100%': { transform: 'rotate(0deg) translate(0, 0)' },
          '0%': { transform: 'rotate(-45deg) translate(-2px, 3px)' }
        },
        pulseEffect: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' }
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        plump: 'plump .2s linear 0s normal forwards',
        shrinkbounce: 'shrinkbounce 200ms cubic-bezier(.4,.0,.23,1)',
        check: 'check 125ms 250ms cubic-bezier(.4,.0,.23,1) forwards',
        hamburgertochevronleft: 'hamburgertochevronleft 200ms cubic-bezier(.4,.0,.23,1) forwards',
        hamburgertochevronright: 'hamburgertochevronright 200ms cubic-bezier(.4,.0,.23,1) forwards',
        hamburgertochevronleftreverse: 'hamburgertochevronleftreverse 200ms cubic-bezier(.4,.0,.23,1) forwards',
        hamburgertochevronrightreverse: 'hamburgertochevronrightreverse 200ms cubic-bezier(.4,.0,.23,1) forwards',
        pulseEffect: 'pulseEffect 2s infinite',
        spin: 'spin 14s infinite linear'
      },
      colors: {
        'hyper-red': '#FF2F97',
        'force-yellow': '#FDD701',
        'ultra-purple': '#FF31F3',
        'cyber-teal': '#0BEFFE',
        'apex-blue': '#41ABFF',
        'mach-indigo': '#AB46FF',
        'mach-indigo-300': '#dfb7ff',
        'night-black': '#050E1C',
        'night-black-100': '#4a4a4a',
        'night-black-200': '#828282',
        'night-black-300': '#272b4d',
        'max-white': '#F3F4F6',
      },
    },
    fontFamily: {
      brand: ['"Share Tech Mono"', 'sans-serif'],
      headings: ['"Space Grotesk"', 'sans-serif'],
      body: ['"Lato"', 'sans-serif'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
