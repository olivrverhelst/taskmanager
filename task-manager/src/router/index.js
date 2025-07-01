
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import AddTask from '../AddTask.vue'
import CompletedTasks from '../CompletedTasks.vue'
import MyPet from '../MyPet.vue'
import Details from '../Details.vue'
import Login from '../Login.vue'
import Register from '../Register.vue'
import Welcome from '../Welcome.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/AddTask', name: 'AddTask', component: AddTask },
  { path: '/CompletedTasks', name: 'CompletedTasks', component: CompletedTasks },
  { path: '/MyPet', name: 'MyPet', component: MyPet },
  { path: '/Details', name: 'Details', component: Details },
  { path: '/Login', name: 'Login', component: Login },
  { path: '/Register', name: 'Register', component: Register },
  { path: '/Welcome', name: 'Welcome', component: Welcome },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router