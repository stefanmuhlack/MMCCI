<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Coachee-Profile</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="profile in profiles" :key="profile.id">
        <ProfileCard :profile="profile" @open-form="toggleForm(profile.id)" />
        <div v-if="showFormId === profile.id" class="mt-4">
          <EintragForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ProfileCard from '../components/ProfileCard.vue'
import EintragForm from '../components/EintragForm.vue'
import { fetchProfiles } from '../services/ProfileService.js'

const profiles = ref([])
const showFormId = ref(null)

onMounted(async () => {
  profiles.value = await fetchProfiles()
})

function toggleForm(profileId) {
  showFormId.value = showFormId.value === profileId ? null : profileId
}
</script>
