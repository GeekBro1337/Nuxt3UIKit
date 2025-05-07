<script setup lang="ts">
import RowNavigation from '~/components/RowNavigation.vue'
import ColNavigation from '~/components/ColNavigation.vue'
import { useFetch } from '#app'

const { data } = await useFetch('/api/navigation')
const nav = data.value?.data ?? []
</script>

<template>
  <!-- desktop -->
  <div class="hidden md:flex">
    <RowNavigation :items="nav" />
  </div>

  <!-- mobile -->
  <div class="md:hidden">
    <ColNavigation :items="nav" />
  </div>
</template>
