<template>

    <div class="inner-content">
      <div class="card inner-card">
        <h4 class="card-header">Backlog</h4>
          <Task 
            v-for="task in tasks.data" 
            :key="task.id"
            :task="task">
          </Task>
      </div>
    </div>
  
</template>

<script>
import axios from "axios"
import Task from "./Task"

export default {
  name: "Category",
  components: {
    Task
  },
  props: ["tasks"]
}
</script>

<style>

</style>

