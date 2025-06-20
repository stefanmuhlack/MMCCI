<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm mb-1">Benutzername</label>
          <input v-model="username" type="text" class="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white" required />
        </div>
        <div>
          <label class="block text-sm mb-1">Passwort</label>
          <input v-model="password" type="password" class="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white" required />
        </div>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Login</button>
      </form>
      <div v-if="error" class="text-red-400 mt-4">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

function handleLogin() {
  if (username.value && password.value) {
    sessionStorage.setItem('username', username.value)
    router.push('/')
  } else {
    error.value = 'Bitte Benutzername und Passwort eingeben'
  }
}
</script>
