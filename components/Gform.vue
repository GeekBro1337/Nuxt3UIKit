<template>
  <form
    @submit.prevent="$emit('submit')"
    class="w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg space-y-4 border-2 border-light-background-darker dark:border-dark-background-darker"
  >
    <slot />
  </form>
</template>

<script setup>
defineEmits(['submit']);
</script>