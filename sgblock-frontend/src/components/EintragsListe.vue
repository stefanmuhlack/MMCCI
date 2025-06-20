<template>
  <div class="space-y-4">
    <div v-if="entries.length === 0" class="text-gray-400">Keine Einträge gefunden.</div>
    <div v-for="entry in entries" :key="entry.id" class="p-4 bg-gray-800 rounded shadow">
      <div class="text-sm text-gray-400">{{ formatDate(entry.timestamp) }}</div>
      <div class="text-lg font-semibold text-white mt-2">{{ entry.situation }}</div>
      <div class="text-sm text-gray-300 mt-1">Impulsiv: {{ entry.impulsiveBewertung }}</div>
      <div class="text-sm text-gray-300">Reflektiert: {{ entry.reflektierteBewertung }}</div>
      <div class="text-xs text-gray-500 mt-2 italic truncate">{{ entry.notiz }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const entries = ref([])
const route = useRoute()
const profileId = route.params.profileId || 'demo-id'  // Fallback
const coachId = sessionStorage.getItem('username') || 'default'

onMounted(async () => {
  const res = await fetch(`/api/sg-eintraege/${coachId}/${profileId}`)
  if (res.ok) {
    entries.value = await res.json()
  } else {
    console.error('Fehler beim Laden der Einträge')
  }
})

function formatDate(iso) {
  return new Date(iso).toLocaleString('de-DE')
}
</script>
