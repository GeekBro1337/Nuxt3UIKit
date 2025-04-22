<template>
    <Gform>
        <h3>Username</h3>
        <Ginput>
        </Ginput>

        <h3>Password</h3>
        <Ginput
        type="password"
        >
        </Ginput>
        <Gbutton></Gbutton>
    </Gform>

    <button @click="toggleTheme" class="p-2 bg-primary text-white rounded">
  Переключить тему
    </button>

</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
const { toggleTheme } = useTheme()
</script>