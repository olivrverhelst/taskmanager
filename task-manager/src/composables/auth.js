// src/composables/auth.js
import { ref } from 'vue'

export const currentUser = ref(null)
export const isLoggedIn = ref(false)

const storedUser = localStorage.getItem('user')
if (storedUser) {
  currentUser.value = JSON.parse(storedUser)
  isLoggedIn.value = true
}

export function login() {
  isLoggedIn.value = true
  localStorage.setItem('loggedIn', 'true')
}

export function logout() {
    localStorage.removeItem('user')
  isLoggedIn.value = false
  localStorage.removeItem('loggedIn')
}

// Restore login state on page load
if (localStorage.getItem('loggedIn') === 'true') {
  isLoggedIn.value = true
}
