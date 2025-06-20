<template>
  <div class="bg-gray-800 p-4 rounded shadow text-white">
    <h3 class="text-lg font-bold">{{ profile.name }}</h3>
    <p class="text-sm text-gray-300">ID: {{ profile.id }}</p>
    <div class="mt-2 space-x-2">
      <button @click="$emit('open-form')" class="bg-green-500 px-3 py-1 rounded text-sm hover:bg-green-600">Eintrag</button>
      <button class="bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-600">Analyse</button>
      <button @click="goToEntries" class="bg-purple-500 px-3 py-1 rounded text-sm hover:bg-purple-600">Einträge</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  profile: Object
})

function goToEntries() {
  router.push(`/eintraege/${props.profile.id}`)
}
</script>
