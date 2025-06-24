<script setup>
import { onMounted, ref } from 'vue'
import { formatDate } from './composables/formattime'
const tasks = ref([])

onMounted(() => {
  fetch('http://localhost:3000/tasks')
    .then(res => res.json())
    .then(data => {
      tasks.value = data.filter(task => !task.completed)
    })
    .catch(err => console.error('Failed to fetch tasks:', err))
})

// // ✅ Mark task as completed
function completeTask(taskId) {
  fetch(`http://localhost:3000/tasks/${taskId}/complete`, {
    method: 'PUT'
  })
    .then(() => {
      // Remove the completed task from the list
      tasks.value = tasks.value.filter(task => task.id !== taskId)
    })
    .catch(err => console.error('Failed to mark task as complete:', err))
}
</script>

<template>
  <main>
    <h1>My Tasks</h1>

<table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">Nr</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Due Date</th>
      <th scope="col">Duration</th>
      <th scope="col">Completed</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in tasks" :key="task.id">
        <th scope="row">{{task.id}}</th>
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ formatDate(task.due_date) }}</td>
          <td>{{ task.duration_value }} {{ task.duration_unit }}</td>
          <td><button @click="completeTask(task.id)" class="btn btn-success">
            Mark as completed
            </button></td>
        </tr>
  </tbody>
</table>
    <p v-if="tasks.length === 0">No tasks added yet.</p>
  </main>
</template>
<style scoped>
</style>