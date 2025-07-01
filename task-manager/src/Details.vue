<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { currentUser } from './composables/auth'

const nickname = ref('')
const petname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const message = ref('')
const error = ref('')

async function loadUserDetails() {
  try {
    const userId = currentUser.value?.id
    if (!userId) {
      error.value = 'User not logged in'
      return
    }
    const response = await axios.get(`http://localhost:3000/users/${userId}`)
    const user = response.data

    nickname.value = user.nickname || ''
    petname.value = user.petname || ''
    email.value = user.email || ''
  } catch (err) {
    error.value = 'Failed to load user details'
  }
}

async function saveDetails() {
  error.value = ''
  message.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    const userId = currentUser.value?.id
    if (!userId) {
      error.value = 'User not logged in'
      return
    }

    const payload = {
      nickname: nickname.value,
      petname: petname.value,
      email: email.value,
    }

    if (password.value.trim() !== '') {
      payload.password = password.value
    }

    const response = await axios.put(`http://localhost:3000/users/${userId}`, payload)

    message.value = 'Details updated successfully!'

    // Update currentUser reactive object
    if (currentUser.value) {
      Object.assign(currentUser.value, response.data)
    }

    // Clear password fields
    password.value = ''
    confirmPassword.value = ''
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to update details'
  }
}

onMounted(() => {
  loadUserDetails()
})
</script>

<template>
  <main>
    <h1>My details</h1>

    <form @submit.prevent="saveDetails">
      <fieldset>
        <div class="mb-3">
          <label for="nicknameInput" class="form-label">Nickname</label>
          <input
            id="nicknameInput"
            type="text"
            class="form-control"
            v-model="nickname"
          />
        </div>

        <div class="mb-3">
          <label for="petnameInput" class="form-label">Petname</label>
          <input
            id="petnameInput"
            type="text"
            class="form-control"
            v-model="petname"
          />
        </div>

        <div class="mb-3">
          <label for="emailInput" class="form-label">Email</label>
          <input
            id="emailInput"
            type="email"
            class="form-control"
            v-model="email"
          />
        </div>

        <div class="mb-3">
          <label for="passwordInput" class="form-label">New Password</label>
          <input
            id="passwordInput"
            type="password"
            class="form-control"
            v-model="password"
            placeholder="New Password"
            autocomplete="new-password"
          />
        </div>

        <div class="mb-3">
          <label for="confirmPasswordInput" class="form-label">Confirm New Password</label>
          <input
            id="confirmPasswordInput"
            type="password"
            class="form-control"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            autocomplete="new-password"
          />
        </div>

        <button type="submit" class="btn btn-primary">Save</button>
      </fieldset>
    </form>

    <div v-if="message" class="alert alert-success mt-3">{{ message }}</div>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </main>
</template>
