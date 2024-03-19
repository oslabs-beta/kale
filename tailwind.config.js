/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './client/pages/**/*.tsx',
    './client/components/**/*.tsx',
    './client/public/index.html',
    'node_modules/flowbite-react/lib/esm/',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Open Sans', 'Breeze Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        kalegreen: {
          50: '#E6FAF1',
          100: '#CDF4E2',
          200: '#9FEAC8',
          300: '#6CDFAB',
          400: '#3AD48F',
          500: '#26AE71',
          600: '#1E8A5A',
          700: '#176944',
          800: '#10472E',
          900: '#072116',
          950: '#04110B',
        },
        kaleblue: {
          50: '#EDFCFD',
          100: '#DBFAFB',
          200: '#B2F3F6',
          300: '#8DEEF1',
          400: '#69E8ED',
          500: '#41E2E8',
          600: '#1AD0D6',
          700: '#139B9F',
          800: '#0D6669',
          900: '#073537',
          950: '#031A1B',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
