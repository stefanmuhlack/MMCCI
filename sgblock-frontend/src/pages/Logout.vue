<template>
  <p class="p-6">Logout... Weiterleitung zur Login-Seite.</p>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(() => {
  sessionStorage.clear()
  router.push('/login')
})
</script>
