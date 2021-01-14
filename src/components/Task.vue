<template>

  <div class="card" v-if="task.category === 'Backlog'">
    <h5 class="card-header">{{task.title}}</h5>
    <div class="card-body">
      <p class="card-text">{{task.description}}</p>
      
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#backlog" @click.prevent="pickOne(task.id)">
        Actions
      </button>

      <!-- Modal -->
      <div class="modal fade" id="backlog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="backlogLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="backlogLabel">{{oneTask.title}}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {{oneTask.description}}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click.prevent="deleteTask(oneTask.id)">Delete</button>
              <button type="button" class="btn btn-success forward" data-bs-dismiss="modal" @click.prevent="todo(oneTask.id)">Todo</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  
</template>

<script>
import axios from "axios"

export default {
  name: "Task",
  data() {
    return {
      server: "http://localhost:3000",
      oneTask: []
    }
  },
  props: ["task"],
  methods: {
    pickOne(id) {
      axios({
        method: "GET",
        url: this.server+`/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(response => {
        console.log(response.data.data.title)
        this.oneTask = response.data.data
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style>

</style>