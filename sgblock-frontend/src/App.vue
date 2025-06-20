<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-6 bg-gray-900 text-white min-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
</script>
