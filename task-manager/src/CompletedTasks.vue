<script setup>
import { ref, onMounted } from 'vue' 
import { formatDate } from './composables/formattime'
import { currentUser } from './composables/auth' // <-- Add this
const completedTasks = ref([])

onMounted(async () => {
  const userId = currentUser.value?.id
  if (!userId) {
    console.warn('User not logged in')
    return
  }

  try {
    const res = await fetch(`http://localhost:3000/tasks?user_id=${userId}`)
    const data = await res.json()

    if (!Array.isArray(data)) {
      console.error('Unexpected response:', data)
      return
    }

    // ✅ Filter only completed tasks
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
          <th>Difficulty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in completedTasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ formatDate(task.due_date) }}</td>
          <td>{{ task.duration_value }} {{ task.duration_unit }}</td>
          <td>{{ task.difficulty }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No completed tasks yet!</p>
  </main>
</template>
<style scoped>
</style>