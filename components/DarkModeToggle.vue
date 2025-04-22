<template>
    <Switch
      v-model="enabled"
      v-if="enabled !== null"
      @click="toggleTheme"
      :class="enabled ? 'bg-gray-600' : 'bg-gray-200'"
      class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none"
    >
      <span class="sr-only">Toggle Theme</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-9' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out"
      >
        <MoonIcon v-if="enabled" class="h-[34px] w-[34px] fill-primary" />
        <SunIcon v-else class="h-[34px] w-[34px] fill-primary" />
      </span>
    </Switch>
  </template>
  
  <script setup lang="ts">
  import { Switch } from '@headlessui/vue'
  import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
  import { useTheme } from '@/composables/useTheme'
  
  const { enabled, toggleTheme } = useTheme()
  </script>  