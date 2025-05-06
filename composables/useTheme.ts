// composables/useTheme.ts
import { ref, onMounted, watch } from 'vue'

const enabled = ref(false) // true → dark

/** Применяем/убираем класс .dark на <html> */
function applyTheme() {
  document.documentElement.classList.toggle('dark', enabled.value)
}

/** Инвертируем тему */
function toggleTheme() {
  enabled.value = !enabled.value
}

/** Инициализация: localStorage → enabled */
onMounted(() => {
  const saved = localStorage.getItem('theme')   // 'dark' | 'light' | null
  if (saved) enabled.value = saved === 'dark'
  else enabled.value =
    window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme()
})

/** Сохраняем состояние и применяем класс */
watch(enabled, () => {
  localStorage.setItem('theme', enabled.value ? 'dark' : 'light')
  applyTheme()
})

export function useTheme() {
  return { enabled, toggleTheme }
}
