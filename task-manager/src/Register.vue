<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn, currentUser } from './composables/auth'

const router = useRouter()
const email = ref('')
const nickname = ref('')
const petname = ref('')
const password = ref('')
const password2 = ref('')

async function handleRegister() {
  if (password.value !== password2.value) {
    alert("Passwords don't match!")
    return
  }

  const userData = {
    email: email.value,
    nickname: nickname.value,
    petname: petname.value,
    password: password.value,
  }

  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(`Error: ${data.error || 'Failed to register'}`)
      return
    }

    // ✅ Save to localStorage so user stays logged in after refresh
    localStorage.setItem('user', JSON.stringify(data))

    // ✅ Set global auth state
    isLoggedIn.value = true
    currentUser.value = data

    alert('Registration successful!')
    router.push('/')
  } catch (err) {
    console.error('Registration failed:', err)
    alert('Failed to register due to network error.')
  }
}

</script>

<template>
  <main>
    <br />
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <!-- Email input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <input
          type="email"
          id="form2Example1"
          class="form-control"
          v-model="email"
          required
        />
        <label class="form-label" for="form2Example1">Email address</label>
      </div>

      <!-- Nickname input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <input
          type="text"
          id="form2Example2"
          class="form-control"
          v-model="nickname"
          required
        />
        <label class="form-label" for="form2Example2">Nickname</label>
      </div>

      <!-- Petname input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <input
          type="text"
          id="form2Example3"
          class="form-control"
          v-model="petname"
          required
        />
        <label class="form-label" for="form2Example3">Pet name</label>
      </div>

      <!-- Password input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <input
          type="password"
          id="form2Example4"
          class="form-control"
          v-model="password"
          required
        />
        <label class="form-label" for="form2Example4">Password</label>
      </div>

      <!-- Password2 input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <input
          type="password"
          id="form2Example5"
          class="form-control"
          v-model="password2"
          required
        />
        <label class="form-label" for="form2Example5">Repeat password</label>
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        data-mdb-button-init
        data-mdb-ripple-init
        class="btn btn-primary btn-block mb-4"
      >
        Register
      </button>

      <!-- Login link -->
      <div class="text-center">
        <p>
          Already a member?
          <router-link to="/login">Login</router-link>
        </p>
      </div>
    </form>
  </main>
</template>
