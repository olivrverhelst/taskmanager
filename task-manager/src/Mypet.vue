<script setup>
import { ref, computed } from 'vue'
import { petLevel, petXP, xpForNextLevel, gainXP } from './composables/pet'
import { currentUser } from './composables/auth'

const petname = computed(() => currentUser.value?.petname || 'Your pet')

const progressPercent = computed(() => {
  return (petXP.value / xpForNextLevel(petLevel.value)) * 100
})
</script>

<template>
  <main>
    <section class="vh-100 overflow-auto" style="background: linear-gradient(to bottom, #9B4F96 0%, #0038A8 100%);">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-10 col-xl-10">
        
        <div class="card text-black" style="border-radius: 50px;">
          <div class="card-body p-md-6">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <h3 class="display-5">{{ petname }} is currently level {{ petLevel }}</h3>
                <img src="/pet.jpg" style="height: 250px;" >
                <button @click="gainXP(30)" class="btn btn-success mt-3">Give 30 XP</button>
<div class="progress mt-2">
  <label class="form-label mb-1">Level {{ petLevel }}</label>
  <div
    class="progress-bar text-white d-flex flex-column justify-content-center align-items-center"
    role="progressbar"
    :style="{ width: `${progressPercent.toFixed(0)}%` }"
    :aria-valuenow="progressPercent"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <!-- <strong>{{ progressPercent.toFixed(0) }}%</strong> -->
    <small>{{ petXP }} / {{ xpForNextLevel(petLevel) }} XP</small>
  </div>
</div>



              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </main>
</template>
<style scoped>
.my-progress {
  width: 500px; /* or any desired width */
}
</style>