<script setup>
import { ref } from 'vue' 
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useAddTask } from './composables/addtask'

const taskName = ref('')
const taskDesc = ref('')
const date = ref(null)
const durationValue = ref('')
const durationUnit = ref('')
const difficulty = ref('')
const today = new Date()
const submitForm = useAddTask(taskName, taskDesc, date, durationValue, durationUnit, difficulty)
</script>

<template>
  <main>
    <div>
      <h1>Add tasks</h1>
    </div>
    <div>
      <form @submit.prevent="submitForm">
  <fieldset>
    <div class="mb-3">
      <label for="Input" class="form-label">Task name</label>
      <input type="text" id="TextInput" class="form-control" placeholder="Task name" v-model="taskName">
    </div>
    <div class="mb-3">
      <label for="Input" class="form-label">Task description</label>
      <input type="text" id="TextInput2" class="form-control" placeholder="Task description" v-model="taskDesc">
    </div>
    <div class="mb-3">
      <label class="form-label">Due date</label>
      <Datepicker v-model="date" :min-date="today" class="form-control" placeholder="Select due date"/>
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
  <div class="mb-3">
    <br>
      <label for="Input" class="form-label">Difficulty</label>
      <div class="radio-group">
    <label v-for="num in 5" :key="num" class="radio-label">
      <input type="radio" name="rating" :value="num" v-model="difficulty" />
      {{ num }}
    </label>
  </div>
    </div>  
  </div><br>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>
    </div>
    <div>

    </div>
  </main>
</template>
<style scoped>
.radio-group {
  display: flex;
  gap: 1rem; /* space between buttons */
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-label input[type="radio"] {
  margin-right: 0.3rem;
}
</style>