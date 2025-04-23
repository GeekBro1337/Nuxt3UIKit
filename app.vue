<script setup>
import { useHead } from '#imports'

useHead({
  script: [
    {
      children: `
        if (localStorage.theme === "dark" || 
            (!('theme' in localStorage) && 
            window.matchMedia("(prefers-color-scheme: dark)").matches)) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      `
    }
  ]
})
</script>

<template>
  <div class="min-h-screen
  bg-light-background-default
  dark:bg-dark-background-default
  text-light-text
  dark:text-dark-text
  transition-colors duration-300">
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</div>
</template>
