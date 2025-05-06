<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useFetch } from '#app'

interface NavChild {
  id: number
  url: string
  name: string
  children?: NavChild[]
}

/* ===== 1. Загружаем меню ===== */
const { data, error } = await useFetch<{ data: NavChild[] }>('/api/navigation')
const nav = ref<NavChild[]>(data.value?.data || [])

/* ===== 2. Состояния ===== */
const openMain   = ref<number | null>(null) // открытый пункт на десктопе
const mobileOpen = ref(false)               // открыт ли бургер
const openMobSub = ref<number | null>(null) // открыт ли подпункт в бургере

/* ===== 3. Закрытия ===== */
// Esc
function onEsc (e: KeyboardEvent) {
  if (e.key === 'Escape') {
    openMain.value = null
    openMobSub.value = null
    mobileOpen.value = false
  }
}

// Клик вне десктоп-меню
const desktopMenuRef = ref<HTMLElement | null>(null)
function onClickOutside (e: MouseEvent) {
  if (desktopMenuRef.value && !desktopMenuRef.value.contains(e.target as Node)) {
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

/* Блокируем прокрутку, когда бургер открыт */
watch(mobileOpen, async v => {
  await nextTick()
  document.body.classList.toggle('overflow-hidden', v)
})

/* ===== 4. Вспомогательная функция ===== */
function toggleMain(id: number) {
  openMain.value = openMain.value === id ? null : id
}
</script>

<template>
  <!-- ╔══ Навбар ══╗ -->
  <nav class="bg-primary-50 dark:bg-gray-900 shadow">
    <div class="mx-auto max-w-screen-xl flex items-center justify-between px-4 py-3">

      <!-- Логотип / название -->
      <NuxtLink to="/" class="text-xl font-bold text-primary-600 dark:text-white">
        Shop
      </NuxtLink>
      <ThemeToggle size="sm" class="ml-4" />

      <!-- ══ Burger ══ -->
      <button
        class="md:hidden p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-gray-800
               text-primary-600 dark:text-primary-300 focus:outline-none transition"
        @click="mobileOpen = !mobileOpen"
      >
        <!-- иконки -->
        <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor"
             viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor"
             viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- ══ Десктоп-меню ══ -->
      <ul
        ref="desktopMenuRef"
        class="hidden md:flex gap-8 font-medium relative z-10"
      >
        <li
          v-for="item in nav"
          :key="item.id"
          class="relative select-none"
        >
          <!-- Корневой пункт -->
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
            class="absolute left-0 top-full min-w-[220px]
                   bg-white dark:bg-gray-800 border border-primary-100 dark:border-gray-700
                   shadow-lg rounded-b-xl py-2 mt-1"
          >
            <li v-for="child in item.children" :key="child.id">
              <NuxtLink
                :to="child.url"
                class="block px-4 py-2 whitespace-nowrap
                       text-gray-700 dark:text-gray-200
                       hover:bg-primary-500 hover:text-white
                       dark:hover:bg-primary-400 dark:hover:text-gray-900
                       transition"
              >
                {{ child.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- ══ МОБИЛЬНЫЙ МОДАЛЬНЫЙ БУРГЕР ══ -->
<Transition
  enter-active-class="transition duration-300"
  enter-from-class="opacity-0"
  leave-active-class="transition duration-200"
  leave-to-class="opacity-0"
>
  <!-- backdrop -->
  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-40 flex md:hidden"
  >
    <!-- тёмный фон -->
    <div
      class="absolute inset-0 bg-black/40 backdrop-blur-sm"
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
        class="relative ml-auto w-72 max-w-[80%] h-full overflow-y-auto
               bg-white dark:bg-gray-900
               shadow-xl border-l border-primary-100 dark:border-gray-700"
      >
        <!-- Шапка -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <span class="text-lg font-semibold text-primary-600 dark:text-primary-300">Меню</span>
          <button @click="mobileOpen = false" class="p-2 rounded-md hover:bg-primary-100 dark:hover:bg-gray-800">
            <svg class="w-6 h-6 text-primary-600 dark:text-primary-300" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Список -->
        <ul class="p-4 space-y-2">
          <li v-for="item in nav" :key="`m-${item.id}`">
            <!-- Аккордеон -->
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

            <!-- прямой линк -->
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
                  class="block py-1 text-gray-600 dark:text-gray-300
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


    <!-- Ошибка -->
    <div v-if="error" class="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 p-4 text-sm">
      Не удалось загрузить меню
    </div>
  </nav>
</template>
