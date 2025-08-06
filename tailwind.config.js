/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-red-500',
    'bg-blue-500', 
    'text-white',
    'p-4',
    'p-8',
    'mt-4',
    'bg-gradient-to-br',
    'from-blue-500', 
    'to-purple-600',
    'min-h-screen',
    'flex',
    'items-center',
    'justify-center'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}