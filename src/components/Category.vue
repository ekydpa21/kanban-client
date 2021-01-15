<template>

    <div class="inner-content">
      <div class="card inner-card">
        <h4 class="card-header">{{category.catName}}</h4>
        <div v-if="category.catName === 'Backlog'">
          <Backlog 
            v-for="task in tasks.data" 
            :key="task.id"
            :task="task"
            @newLists="$emit('newLists')">
          </Backlog>
        </div>
        <div v-if="category.catName === 'Todo'">
          <Todo 
            v-for="task in tasks.data" 
            :key="task.id"
            :task="task"
            @newLists="$emit('newLists')">
          </Todo>
        </div>
        <div v-if="category.catName === 'Doing'">
          <Doing 
            v-for="task in tasks.data" 
            :key="task.id"
            :task="task"
            @newLists="$emit('newLists')">
          </Doing>
        </div>
        <div v-if="category.catName === 'Done'">
          <Done 
            v-for="task in tasks.data" 
            :key="task.id"
            :task="task"
            @newLists="$emit('newLists')">
          </Done>
        </div>
      </div>
    </div>
  
</template>

<script>
import axios from "axios"
import Backlog from "./Backlog"
import Todo from "./Todo"
import Doing from "./Doing"
import Done from "./Done"

export default {
  name: "Category",
  components: {
    Backlog,
    Todo,
    Doing,
    Done
  },
  props: ["tasks", "category"],
  created() {
    this.$emit("newLists")
  }
}
</script>

<style>

</style>

