<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Einträge für Profil "{{ profileId }}"</h2>
    <EintragsListe />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import EintragsListe from '../components/EintragsListe.vue'

const route = useRoute()
const profileId = route.params.profileId || 'demo-id'
</script>
