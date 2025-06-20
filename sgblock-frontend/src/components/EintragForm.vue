<template>
  <form @submit.prevent="submitForm" class="bg-gray-800 p-4 rounded shadow text-white space-y-4">
    <div>
      <label class="block mb-1 text-sm">Datum</label>
      <input v-model="entry.date" type="date" class="w-full p-2 rounded bg-gray-700 text-white" required />
    </div>
    <div>
      <label class="block mb-1 text-sm">Situation</label>
      <textarea v-model="entry.situation" class="w-full p-2 rounded bg-gray-700 text-white" rows="2" required />
    </div>
    <div>
      <label class="block mb-1 text-sm">Impulsive Bewertung</label>
      <input v-model="entry.impulsiveBewertung" class="w-full p-2 rounded bg-gray-700 text-white" />
    </div>
    <div>
      <label class="block mb-1 text-sm">Reflektierte Bewertung</label>
      <input v-model="entry.reflektierteBewertung" class="w-full p-2 rounded bg-gray-700 text-white" />
    </div>
    <div>
      <label class="block mb-1 text-sm">Notiz</label>
      <textarea v-model="entry.notiz" class="w-full p-2 rounded bg-gray-700 text-white" rows="3" />
    </div>
    <button type="submit" class="bg-green-500 px-4 py-2 rounded hover:bg-green-600">Eintrag speichern</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const profileId = route.params.profileId || 'p001'  // Fallback, falls keine Route definiert

const entry = ref({
  date: '',
  situation: '',
  impulsiveBewertung: '',
  reflektierteBewertung: '',
  notiz: ''
})

async function submitForm() {
  try {
    const response = await fetch(`/api/sg-eintrag/${profileId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry.value)
    })

    if (!response.ok) throw new Error('Fehler beim Speichern')
    alert('Eintrag erfolgreich gespeichert ✅')
    entry.value = { date: '', situation: '', impulsiveBewertung: '', reflektierteBewertung: '', notiz: '' }
  } catch (err) {
    console.error(err)
    alert('❌ Fehler beim Speichern')
  }
}
</script>
