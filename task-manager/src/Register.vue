<script setup>
import { ref } from 'vue' 

</script>

<template>
  <main>
    <form>
  <!-- Email input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="email" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1">Email address</label>
  </div>

  <!-- Nickname input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="text" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Nickname</label>
  </div>

  <!-- Petname input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="text" id="form2Example3" class="form-control" />
    <label class="form-label" for="form2Example3">Pet name</label>
  </div>

  <!-- Password input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="password" id="form2Example4" class="form-control" />
    <label class="form-label" for="form2Example4">Password</label>
  </div>

  <!-- Password2 input -->
  <div data-mdb-input-init class="form-outline mb-4">
    <input type="password" id="form2Example5" class="form-control" />
    <label class="form-label" for="form2Example5">Repeat password</label>
  </div>
  

  <!-- Submit button -->
  <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Register</button>

  <!-- Register buttons -->
  <div class="text-center">
    <p>Already a member? <a href="#!">Login</a></p>
  </div>
</form>

  </main>
</template>
<style scoped>
</style>