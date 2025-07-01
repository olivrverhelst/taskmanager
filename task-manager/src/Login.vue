<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn, currentUser } from './composables/auth'

const router = useRouter()
const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    console.log('Attempting login with:', email.value, password.value);
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });
    console.log('Response status:', res.status);

    const data = await res.json();
    console.log('Response data:', data);

    if (!res.ok) {
      alert(data.error || 'Login failed');
      return;
    }
    localStorage.setItem('user', JSON.stringify(data))

    isLoggedIn.value = true
    currentUser.value = data 

    alert('Login successful!');
    router.push('/');
  } catch (err) {
    console.error('Login error:', err);
    alert('Network error during login');
  }
}
</script>

<template>
  <main>
    <br>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <!-- Email input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="email"
          required
        />
        <label class="form-label" for="email">Email address</label>
      </div>

      <!-- Password input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="password"
          required
        />
        <label class="form-label" for="password">Password</label>
      </div>

      <!-- Forgot password link -->
      <div class="row mb-4">
        <div class="col">
          <a href="#!">Forgot password?</a>
        </div>
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        data-mdb-button-init
        data-mdb-ripple-init
        class="btn btn-primary btn-block mb-4"
      >
        Sign in
      </button>

      <!-- Register link -->
      <div class="text-center">
        <p>
          Not a member?
          <router-link to="/Register">Register</router-link>
        </p>
      </div>
    </form>
  </main>
</template>
