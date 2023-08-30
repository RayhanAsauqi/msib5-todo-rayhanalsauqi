<script setup lang="ts">
import NavigationNav from "./components/NavigationNav.vue";
</script>

<template>
  <main class="max-w-2xl mx-auto">
    <NavigationNav />
    <hr class="mt-5" />
    <RouterView></RouterView>
  </main>
</template>
