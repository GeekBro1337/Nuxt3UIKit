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
  <NuxtLayout />
</template>
