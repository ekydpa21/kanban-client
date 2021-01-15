<template>

  <div class="card" v-if="task.CategoryId === 4">
    <h5 class="card-header">{{task.title}}<div id="action"><i class="bi bi-pencil-square" id="pencil" data-bs-toggle="modal" data-bs-target="#editForm"></i><i class="bi bi-trash" id="trash" @click.prevent="deleteTask(task.id)"></i></h5>
    <div class="card-body">
      <p class="card-text">{{task.description}}</p>
      <div class="footer">
        <button type="button" class="btn btn-success forward" data-bs-dismiss="modal" @click.prevent="doing(task.id)"><i class="bi bi-chevron-left"></i>Doing</button>
      </div>
    </div>

    <!-- Form Add Modal -->
    <div class="modal fade" id="editForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editFormLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editFormLabel">Update task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
            <form id="add-form" method="post">
              <div class="card">
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input v-model="editTitle" type="text" class="form-control" id="editTitle" placeholder="Task's title">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Description</label>
                    <input v-model="editDescription" type="text" class="form-control" id="editDescription" placeholder="Task's description">
                  </div>
                </div>
              </div>
            </form>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="editTask(task.id)">Submit</button>
          </div>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script>
import axios from "axios"

export default {
  name: "Done",
  data() {
    return {
      server: "http://localhost:3000",
      editTitle: "",
      editDescription: ""
    }
  },
  props: ["task"],
  methods: {
    editTask(id) {
      axios({
        method: "PUT",
        url: this.server+`/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title: this.editTitle,
          description: this.editDescription
        }
      })
      .then(response => {
        this.$emit('newLists')
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: this.server+`/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(response => {
        this.$emit('newLists')
      })
      .catch(err => {
        console.log(err)
      })
    },
    doing(id) {
      axios({
        method: "PATCH",
        url: this.server+`/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          CategoryId: 3
        }
      })
      .then(response => {
        this.$emit('newLists')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .footer {
    float: left;
  }
  #action {
    float: right;
  }
  #trash {
    cursor: pointer;
    margin-left: 15px;
  }
  #pencil {
    cursor: pointer;
  }
</style>