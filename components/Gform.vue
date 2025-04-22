<template>
  <form
    @submit.prevent="$emit('submit')"
    class="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4"
  >
    <slot />
  </form>
</template>

<script setup>
defineEmits(['submit']);
</script>