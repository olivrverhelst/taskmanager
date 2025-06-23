<script setup>
import { ref } from 'vue' 
import navbar from './components/navbar.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const date = ref(null)
const durationUnit = ref('')

</script>

<template>
  <navbar />
  <router-view />
  <br>
  <main>
    <div>
      <h1>Add tasks</h1>
    </div>
    <div>
      <form>
  <fieldset>
    <div class="mb-3">
      <label for="Input" class="form-label">Task name</label>
      <input type="text" id="TextInput" class="form-control" placeholder="Task name">
    </div>
    <div class="mb-3">
      <label for="Input" class="form-label">Task description</label>
      <input type="text" id="TextInput2" class="form-control" placeholder="Task description" rows="3">
    </div>
    <div class="mb-3">
      <label class="form-label">Due date</label>
      <Datepicker v-model="date" class="form-control" placeholder="Select due date" />
    </div>
    <div>
      <label for="customRange2" class="form-label">Expected time needed</label>
      <input
      type="number"
      min="1"
      class="form-control"
      id="estimatedDuration"
      v-model="durationValue"
      placeholder="Enter value"
    />
    <select class="form-select" v-model="durationUnit">
       <option disabled value="">Select time unit</option>
      <option value="minutes">Minutes</option>
      <option value="hours">Hours</option>
      <option value="days">Days</option>
      <option value="weeks">Weeks</option>
    </select>
    </div><br>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>
    </div>
  </main>
</template>
<style scoped>
</style>
