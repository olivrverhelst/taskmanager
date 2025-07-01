<script setup>
import { computed, onMounted } from 'vue'
import axios from 'axios'
import { petLevel, petXP, xpForNextLevel, setPetStats } from './composables/pet'
import { currentUser } from './composables/auth'

const petname = computed(() => currentUser.value?.petname || 'Your pet')

const progressPercent = computed(() => {
  return (petXP.value / xpForNextLevel(petLevel.value)) * 100
})

// Fetch pet stats from backend on mount
async function fetchPetStats() {
  if (!currentUser.value?.id) return
  try {
    const res = await axios.get(`http://localhost:3000/pet/${currentUser.value.id}`)
    setPetStats(res.data.pet_level, res.data.pet_xp)
  } catch (err) {
    console.error('Failed to fetch pet stats:', err)
  }
}

// Call on mounted
onMounted(fetchPetStats)

// This function should be called after a task is marked complete
// and backend returns updated pet XP/level
function updatePetStatsFromBackend(level, xp) {
  setPetStats(level, xp)
}
</script>

<template>
  <main class="text-center">
    <h1>{{ petname }} is currently level {{ petLevel }}</h1>
    <img src="/pet.jpg" alt="Pet Image" class="centered-image" height="250px"/>

    <!-- No more manual XP button -->
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
        <small>{{ petXP }} / {{ xpForNextLevel(petLevel) }} XP</small>
      </div>
    </div>               
  </main>
</template>

<style scoped>
.text-center {
  text-align: center;
}
.centered-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 250px;
}
</style>

