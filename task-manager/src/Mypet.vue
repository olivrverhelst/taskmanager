<script setup>
import { ref } from 'vue' 

</script>

<template>
  <main>
    <div>
      <h1>My pet</h1>
    </div>
    <div class="mb-3">
      <h1>{{petname}}</h1>
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