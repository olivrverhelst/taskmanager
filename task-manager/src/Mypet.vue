<script setup>
import { ref } from 'vue' 

</script>

<template>
  <main>
    <div>
      <h1>My pet</h1>
    </div>
    <div class="card" style="width: 18rem;">
  <img src="/pet.jpg" class="card-img-top" alt="pet mascot">
  <div class="card-body">
    <p class="card-text"> {{ petname }}</p>
  </div>
</div>
    
    <div class="mb-3">
      <div class="progress">
        <label class="form-label">{{level}}</label>
        <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
    </div>
    </div>

    
    
    
  
  </main>
</template>
<style scoped>
</style>