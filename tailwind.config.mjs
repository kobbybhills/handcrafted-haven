/*eslint-disable*/
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'haven-green': '#2D5A27',
        // 'haven-terracotta': '#CC7351',
        // 'haven-cream': '#F9F7F2',
        // 'haven-dark-green': '#1B3A1B',
        // 'haven-darker-green': '#132813',
      },
    },
  },
  plugins: [],
};