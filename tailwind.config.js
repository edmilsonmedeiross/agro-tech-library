/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        green: {
          50:'#ECFDF7',
          100:'#D1FAEC',
          200:'#A7F3DA',
          300:'#6EE7BF',
          400:'#34D39E',
          500:'#10B981',
          600:'#059666',
          700:'#047852',
          800:'#065F42',
          900:'#064E36',
        },
        purple: {
          50:'#E2D6FE',
          100:'#CBB5FD',
          200:'#c783fd',
          300:'#8B5CF6',
          400:'#713AED',
          500:'#5E28D9',
          600:'#4E21B6',
          700:'#421D95',
          800:'#6e31aa',
          900:'#13111c',
        },
      }
    },
  },
  plugins: [],
}
