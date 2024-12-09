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
