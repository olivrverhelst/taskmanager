<script setup>
import { ref } from 'vue' 

</script>

<template>
  <main>
     <div class="text-center">
    
    <section class="vh-100 overflow-auto" style="background: linear-gradient(to bottom, #9B4F96 0%, #0038A8 100%);">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-10 col-xl-10">
        
        <div class="card text-black" style="border-radius: 50px;">
          <div class="card-body p-md-6">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <h2 class="display-5">Welcome To Task Manager</h2>
            <p class="lead" style="text-align: center;">
                Here you can keep track of tasks while you level up your pet! <br>
                <router-link to="/Register">Register</router-link> or <router-link to="/add-task">login</router-link> to get started!
                <img src="/pet.jpg" style="height: 250px;" >
                
            </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</div>
  </main>
</template>
<style scoped>
</style>