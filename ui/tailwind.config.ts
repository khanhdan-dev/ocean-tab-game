import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'ocean-primary-medium': '#3f4858',
        'ocean-primary-slight': '#394b59',
        'ocean-darkblue': '#323e4f',
        'ocean-dark': '#09090B',
        'ocean-turquoise': '#5E949F',
        'ocean-lightgrey': '#B6C4C4',
        'ocean-yellow': '#FDE74C',
        'ocean-white': '#F3F6F9',
        'ocean-orange': '#FA824C',
        'ocean-blue': '#4177AC',
        'ocean-copper': '#CE8964',
        'ocean-amber': '#F09F0D',
        'ocean-green': '#248232',
        'ocean-flashturq': '#47c9af',
        'ocean-flashred': '#F8333C',
        'ocean-flashgreen': '#C8EC37',
      },
      backgroundImage: {
        mobile: "url('/background/background-mobile.jpg')",
        desktop: "url('/background/background-desktop.jpg')",
        'firefly-radial':
          'radial-gradient(50% 50% at 50% 50%, rgba(253, 255, 80, 0.6) 40%, rgba(217,217,217, 0) 100%)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' }, // Starting and ending positions
          '25%': { transform: 'rotate(-3deg)' }, // Rotate left slightly
          '50%': { transform: 'rotate(3deg)' }, // Rotate right slightly
          '75%': { transform: 'rotate(-3deg)' }, // Rotate left again slightly
        },
        'pop-up': {
          '0%': { transform: 'translateY(50dvh)' }, // Start from the bottom
          '100%': { transform: 'translateY(0)' }, // Move to the center (adjust for perfect centering)
        },
        'wrap-net': {
          '0%': { transform: 'scale(1.4)', opacity: '1' },
          '25%': { transform: 'scale(1.3)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '75%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bubble: {
          '0%': { transform: 'translateY(100%) scale(0.5)', opacity: '0.5' },
          '50%': { transform: 'translateY(-50vh) scale(1)', opacity: '0.7' },
          '100%': { transform: 'translateY(-100vh) scale(0.5)', opacity: '0' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out', // Softer and slower shake
        'shake-infinite': 'shake 1s ease-in-out infinite', // Softer and slower shake
        'pop-up': 'pop-up 0.3s ease-in-out', // Softer and slower shake
        'wrap-net': 'wrap-net 0.3s ease-in-out forwards',
        bubble: 'bubble 50s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
