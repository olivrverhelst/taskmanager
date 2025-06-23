
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import AddTask from '../AddTask.vue'
import CompletedTasks from '../CompletedTasks.vue'
// import MyPet from '../MyPet.vue'
import MyDetails from '../MyDetails.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/add-task', name: 'AddTask', component: AddTask },
  { path: '/completed-tasks', name: 'CompletedTasks', component: CompletedTasks },
//   { path: '/MyPet', name: 'MyPet', component: MyPet },
  { path: '/MyDetails', name: 'MyDetails', component: MyDetails },
  // add more routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router