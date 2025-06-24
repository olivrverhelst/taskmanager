
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import AddTask from '../AddTask.vue'
import CompletedTasks from '../CompletedTasks.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/AddTask', name: 'AddTask', component: AddTask },
  { path: '/CompletedTasks', name: 'CompletedTasks', component: CompletedTasks },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router