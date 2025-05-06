<template>
  <Switch
    v-model="enabled"
    @click="toggleTheme"
    :class="[
      enabled ? 'bg-primary-500' : 'bg-primary-100',
      'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent',
      'transition-colors duration-300 ease-in-out focus:outline-none'
    ]"
    :style="size.switch"
  >
    <span class="sr-only">Toggle theme</span>

    <span
      aria-hidden="true"
      :class="[
        enabled ? size.translate : 'translate-x-0',
        'pointer-events-none flex items-center justify-center transform rounded-full bg-white shadow',
        'transition duration-300 ease-in-out'
      ]"
      :style="size.knob"
    >
      <MoonIcon v-if="enabled"  :style="size.icon" class="fill-primary-600" />
      <SunIcon  v-else        :style="size.icon" class="fill-primary-600" />
    </span>
  </Switch>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Switch } from '@headlessui/vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
import { useTheme } from '@/composables/useTheme'

const { enabled, toggleTheme } = useTheme()

const props = defineProps<{ size?: 'sm' | 'md' | 'lg' }>()

const size = computed(() => {
  switch (props.size) {
    case 'sm':
      return {
        switch:   { width: '44px', height: '22px' },
        knob:     { width: '18px', height: '18px' },
        icon:     { width: '18px', height: '18px' },
        translate:'translate-x-[22px]'
      }
    case 'lg':
      return {
        switch:   { width: '88px', height: '44px' },
        knob:     { width: '38px', height: '38px' },
        icon:     { width: '38px', height: '38px' },
        translate:'translate-x-[44px]'
      }
    default:    // md
      return {
        switch:   { width: '70px', height: '34px' },
        knob:     { width: '30px', height: '30px' },
        icon:     { width: '30px', height: '30px' },
        translate:'translate-x-[36px]'
      }
  }
})
</script>
