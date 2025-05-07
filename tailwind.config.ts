// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.{vue,js,ts}',
      './pages/**/*.{vue,js,ts}',
      './app.vue',
      './plugins/**/*.{js,ts}',
    ],
    darkMode: 'class',          // по желанию
    theme: {
      extend: {
        colors: {
          /* базовые */
          white:  '#ffffff',
          black:  '#111827',
  
          /* основная фирменная палитра (фиолетовый) */
          primary: {
            50:  '#f8f5ff',
            100: '#ede8ff',
            200: '#d6caff',
            300: '#b5a0ff',
            400: '#9175ff',   // <-- основной (primary-400)
            500: '#7c3aed',   // чуть темнее (по умолчанию был Tailwind violet-600)
            600: '#5d28c9',
            700: '#4720a3',
            800: '#32187d',
            900: '#231254',
          },
  
          /* дополнительные (по желанию) */
          secondery: {
            50:  '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          },
        },
      },
    },
    plugins: [],
  }
  