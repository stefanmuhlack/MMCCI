<template>
  <aside class="w-64 min-h-screen bg-gray-800 text-white p-6 flex flex-col justify-between">
    <div>
      <h1 class="text-2xl font-bold mb-8">SGBlock</h1>
      <nav>
        <ul class="space-y-4">
          <li>
            <router-link to="/" class="hover:text-blue-400" active-class="text-blue-400">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/coachees" class="hover:text-blue-400" active-class="text-blue-400">Coachees</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/login" class="hover:text-blue-400" active-class="text-blue-400">Login</router-link>
          </li>
          <li v-else>
            <router-link to="/logout" class="hover:text-blue-400" active-class="text-blue-400">Logout</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="text-sm text-gray-400 pt-6">
      Benutzer: {{ username }}
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const username = ref('Gast')
const isLoggedIn = ref(false)

onMounted(() => {
  const user = sessionStorage.getItem('username')
  if (user) {
    username.value = user
    isLoggedIn.value = true
  }
})
</script>
