<template>
  <div class="">
    <!-- Header -->
    <header class="w-full px-6 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">My App</h1>
      <DarkModeToggle />
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>
