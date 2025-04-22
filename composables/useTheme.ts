import { ref, onMounted } from 'vue'

const enabled = ref<boolean | null>(null)

export function useTheme() {
  const applyTheme = () => {
    const html = document.documentElement
    if (enabled.value) {
      html.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      html.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

  const initTheme = () => {
    const localTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (localTheme === 'dark' || (!localTheme && prefersDark)) {
      enabled.value = true
    } else {
      enabled.value = false
    }

    applyTheme()
  }

  const toggleTheme = () => {
    enabled.value = !enabled.value
    applyTheme()
  }

  onMounted(initTheme)

  return {
    enabled,
    toggleTheme,
  }
}
