<template>
  <div class="min-h-screen bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text transition-colors duration-300">
    <!-- Header -->
    <header class="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-slate-900 shadow-sm">
      <h1 class="text-xl font-bold">My App</h1>
      <DarkModeToggle />
    </header>

    <!-- Page content -->
    <main class="p-6 max-w-5xl mx-auto">
      <NuxtPage />
    </main>
  </div>
</template>
