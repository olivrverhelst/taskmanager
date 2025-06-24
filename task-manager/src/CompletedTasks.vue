<script setup>
import { ref, onMounted } from 'vue' 
import { formatDate } from './composables/formattime'
const completedTasks = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json()
    // Filter only completed tasks
    completedTasks.value = data.filter(task => task.completed === 1)
  } catch (error) {
    console.error('Failed to fetch completed tasks:', error)
  }
})
</script>

<template>
  <main>
    <h1>Completed Tasks</h1>
    <table v-if="completedTasks.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Duration</th>
          <th>Completed At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in completedTasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ formatDate(task.due_date) }}</td>
          <td>{{ task.duration_value }} {{ task.duration_unit }}</td>
          <td>{{ formatDate(task.completedAt) }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No completed tasks yet!</p>
  </main>
</template>
<style scoped>
</style>