/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: [
    "index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      animation: {
      'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
    },
    keyframes: {
      'slide-in-right': {
        '0%': {
          transform: 'translateX(100%)',
          opacity: '0',
        },
        '100%': {
          transform: 'translateX(0)',
          opacity: '1',
        },
      },
  }}
  },
  plugins: [
    flowbite.plugin(),
  ],
  
}
