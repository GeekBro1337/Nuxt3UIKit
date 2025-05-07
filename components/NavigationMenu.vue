<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useFetch } from '#app'
import burger from '~/components/icons/burger.vue'
import Close from './icons/close.vue'


const { data, error } = await useFetch<{ data: NavChild[] }>('/api/navigation')
const nav = ref<NavChild[]>(data.value?.data || [])


const openMain   = ref<number | null>(null) 
const mobileOpen = ref(false)               
const openMobSub = ref<number | null>(null) 


function onEsc (e: KeyboardEvent) {
  if (e.key === 'Escape') {
    openMain.value = null
    openMobSub.value = null
    mobileOpen.value = false
  }
}


const MenuRef = ref<HTMLElement | null>(null)
function onClickOutside (e: MouseEvent) {
  if (MenuRef.value && !MenuRef.value.contains(e.target as Node)) {
    openMain.value = null
  }
}

onMounted(() => {
  window.addEventListener('keydown', onEsc)
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onEsc)
  document.removeEventListener('click', onClickOutside)
})

function toggleMain(id: number) {
  openMain.value = openMain.value === id ? null : id
}
</script>

<template>

  <nav class="bg-primary-50 dark:bg-secondery-900 shadow">
    <div class="mx-auto max-w-screen-xl flex items-center justify-between px-4 py-3">

      <NuxtLink to="/" class="text-xl font-bold text-primary-600 dark:text-white">
        Shop
      </NuxtLink>
      <ThemeToggle size="sm" class="ml-4" />

      <button
        class=" w-10 md:hidden p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-secondery-800
               text-primary-600 dark:text-primary-300 focus:outline-none transition "
        @click="mobileOpen = !mobileOpen"
      >

        <burger
        class="md:hidden p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-secondery-800
               text-primary-600 dark:text-primary-300 focus:outline-none transition"
        v-if="!mobileOpen"
        />
        <Close v-else/>
      </button>

    
      <ul
        ref="MenuRef"
        class="hidden md:flex gap-8 font-medium relative z-10"
      >
        <li
          v-for="item in nav"
          :key="item.id"
          class="relative select-none"
        >

          <button
            v-if="item.children?.length"
            type="button"
            @click="toggleMain(item.id)"
            class="flex items-center gap-1 text-primary-600 dark:text-primary-300
                   hover:text-primary-500 dark:hover:text-primary-200 transition"
          >
            {{ item.name }}
            <svg
              class="w-4 h-4 mt-[2px] transition-transform"
              :class="openMain === item.id && 'rotate-180'"
              viewBox="0 0 20 20" fill="currentColor"
            >
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Если без подпунктов -->
          <NuxtLink
            v-else
            :to="item.url"
            class="text-primary-600 dark:text-primary-300
                   hover:text-primary-500 dark:hover:text-primary-200 transition"
          >
            {{ item.name }}
          </NuxtLink>

          <!-- Подменю -->
          <ul
            v-if="item.children?.length && openMain === item.id"
            class="absolute left-0 top-full min-w-[150px]
                   bg-white dark:bg-gray-800 border border-primary-100 dark:border-secondery-700
                   shadow-lg rounded-b-xl py-2 mt-1"
          >
            <li v-for="child in item.children" :key="child.id">
              <NuxtLink
                :to="child.url"
                class="block px-4 py-2 whitespace-nowrap
                       text-secondery-700 dark:text-secondery-200
                       hover:bg-primary-500 hover:text-white
                       dark:hover:bg-primary-400 dark:hover:text-secondery-900
                       transition"
              >
                {{ child.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>

<Transition
  enter-active-class="transition duration-300"
  enter-from-class="opacity-0"
  leave-active-class="transition duration-200"
  leave-to-class="opacity-0"
>

  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-40 flex md:hidden"
  >

    <div
      class="absolute inset-0 bg-secondery-900/50"
      @click="mobileOpen = false"
    />

    <!-- выезжающая панель -->
    <Transition
      enter-active-class="transition-transform duration-300"
      enter-from-class="translate-x-full"
      leave-active-class="transition-transform duration-200"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="mobileOpen"
        class="relative ml-auto 
        w-4/5 
        max-w-4/5 
        h-full overflow-y-auto
      bg-secondery-100 dark:bg-secondery-900
        shadow-xl border-l border-primary-100 dark:border-secondery-700"
      >
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <span class="text-lg font-semibold text-primary-600 dark:text-primary-300">Меню</span>
          <button @click="mobileOpen = false" class="p-2 rounded-md hover:bg-primary-100 dark:hover:bg-gray-800">
            <svg class="w-6 h-6 text-primary-600 dark:text-primary-300" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

       
        <ul class="p-4 space-y-2">
          <li v-for="item in nav" :key="`m-${item.id}`">
            <button
              v-if="item.children?.length"
              @click="openMobSub = openMobSub === item.id ? null : item.id"
              class="w-full flex items-center justify-between py-2 font-medium
                     text-primary-600 dark:text-primary-300"
            >
              {{ item.name }}
              <svg class="w-5 h-5 transition-transform"
                   :class="openMobSub === item.id && 'rotate-180'"
                   viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"/>
              </svg>
            </button>

            <NuxtLink
              v-else
              :to="item.url"
              class="block py-2 font-medium
                     text-primary-600 dark:text-primary-300
                     hover:text-primary-500 dark:hover:text-primary-200 transition"
              @click="mobileOpen = false"
            >
              {{ item.name }}
            </NuxtLink>
            

            <!-- подпункты -->
            <ul v-if="item.children?.length && openMobSub === item.id" class="pl-4 space-y-1">
              <li v-for="child in item.children" :key="`mc-${child.id}`">
                <NuxtLink
                  :to="child.url"
                  class="block py-1 text-secondery-600 dark:text-secondery-300
                         hover:text-primary-500 dark:hover:text-primary-200 transition"
                  @click="mobileOpen = false"
                >
                  {{ child.name }}
                </NuxtLink>
                
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </Transition>
  </div>
</Transition>


    <div v-if="error" class="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 p-4 text-sm">
      Не удалось загрузить меню
    </div>
  </nav>
</template>
