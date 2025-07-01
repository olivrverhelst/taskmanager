<script setup>
import { useRouter } from 'vue-router'
import { isLoggedIn, currentUser } from '../composables/auth'
const router = useRouter()

function logout() {
  isLoggedIn.value = false
  currentUser.value = null
  router.push('/welcome')
}
</script>

<template>
  <nav class="w-full bg-blue-900 rounded-lg shadow px-6 py-4">
    <div class="flex justify-evenly">
      <!-- Only when logged in -->
      <template v-if="isLoggedIn">
        <router-link to="/" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
        Home
      </router-link>
        <router-link to="/AddTask" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
          Add task
        </router-link>
        <router-link to="/CompletedTasks" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
          Completed tasks
        </router-link>
        <router-link to="/MyPet" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
          My Pet
        </router-link>
        <router-link to="/Details" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
          Account details
        </router-link>
        <button @click="logout" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
          Logout
        </button>
      </template>

      <!-- Only when NOT logged in -->
      <template v-else>
        <router-link to="/welcome" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
          Welcome
        </router-link>
        <router-link to="/login" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
          Login
        </router-link>
        <router-link to="/register" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
          Register
        </router-link>
        
      </template>
    </div>
  </nav>
</template>

