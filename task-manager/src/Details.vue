<script setup>
import { ref } from 'vue' 

</script>

<template>
  <main>
    <div>
      <h1>My details</h1>
    </div>
    <div>
      <form>
  <fieldset>
    <div class="mb-3">
      <label for="Input" class="form-label">{{nickname}}</label>
      <input type="text" id="TextInput2" class="form-control" placeholder="Nickname" rows="3">
    </div>
    <button type="save" class="btn btn-primary">Save</button>
    <br><br>    
  </fieldset>
</form>
    </div>
  </main>
</template>
<style scoped>
</style>