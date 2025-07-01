import { currentUser } from './auth'
export function useAddTask(taskName, taskDesc, date, durationValue, durationUnit, difficulty) {
  return function submitForm() {
  const userId = currentUser.value?.id
  if (!userId) {
      alert('User not logged in')
      return
    }

  const newTask = {
    user_id: userId,
    name: taskName.value,
    description: taskDesc.value,
    due_date: date.value,                // snake_case, matches backend
    duration_value: durationValue.value, // separate keys
    duration_unit: durationUnit.value,
    difficulty: difficulty.value,
    // no need to send 'completed' since backend defaults to 0
  }

  console.log('New Task:', newTask)

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  })
    .then(res => res.json())
    .then(data => {
      console.log('Task added:', data)
      // optionally update your UI or notify user here
    })
    .catch(err => console.error('Failed to add task:', err))

  taskName.value = ''
  taskDesc.value = ''
  date.value = null
  durationValue.value = ''
  durationUnit.value = ''
  difficulty.value = ''
}
}