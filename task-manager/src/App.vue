<script setup>
import navbar from './components/navbar.vue'
</script>

<template>
  <navbar />
  <br>
  <div class="centered-content">
    <router-view />
  </div>
</template>
