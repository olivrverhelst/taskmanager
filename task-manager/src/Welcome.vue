<script setup>
import { ref } from 'vue' 

</script>

<template>
  <main>
     <div class="text-center">
      <h1>Welcome To Task Manager</h1>
      <p class="lead" style="text-align: center;">
          Here you can keep track of tasks while you level up your pet! <br>
          <router-link to="/Register">Register</router-link> or <router-link to="/login">login</router-link> to get started!
          <img src="/pet.jpg" style="height: 250px;" class="centered-image">
          
      </p>
    </div>
  </main>
</template>
<style scoped>
.centered-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 250px;
}
</style>