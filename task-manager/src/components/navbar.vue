<template>
  <nav class="w-full bg-blue-900 rounded-lg shadow px-6 py-4">
    <div class="flex justify-evenly">
        <router-link to="/" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
        Home
        </router-link>
        <router-link to="/AddTask" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
        Add task
        </router-link>
        <router-link to="/CompletedTasks" class="text-white text-lg font-semibold px-4 py-2 rounded hover:text-gray-300">
        Completed tasks
        </router-link>
    </div>
  </nav>
</template>
