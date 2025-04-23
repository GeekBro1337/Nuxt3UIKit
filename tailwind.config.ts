// tailwind.config.js
export default {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Контрастный фиолетовый
          primary: '#7c3aed',
          'primary-hover': '#6d28d9',
  
          // Светлая тема
          light: {
            background: {
              default: '#f3f4f6',
              lighter: '#ffffff',
              darker: '#e5e7eb'
            },
            text: '#111827',
          },
  
          // Тёмная тема
          dark: {
            background: {
              default: '#0f172a',
              lighter: '#1e293b',
              darker: '#020617'
            },
            text: '#f9fafb',
          },
        },
      },
    },
    plugins: [],
  }
  