<template>


  <div class="container-fluid">
    
    <!-- Navbar -->
    <nav class="navbar navbar-dark" id="navbar">
      <div class="container-fluid">
        <h2><a class="navbar-brand">Kanban App</a></h2>
        <div class="nav-btn d-flex">
          <button class="btn btn-light btn-outline-success" type="submit" data-bs-toggle="modal" data-bs-target="#addForm">Add Task</button>
          <button class="btn btn-light btn-outline-danger" type="submit" @click.prevent="logout()">Log Out</button>
        </div>
      </div>
    </nav>

    <!-- Form Add Modal -->
    <div class="modal fade" id="addForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addFormLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addFormLabel">Add a new task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
            <form id="add-form" method="post">
              <div class="card">
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input v-model="addTitle" type="text" class="form-control" id="addTitle" placeholder="Task's title">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Description</label>
                    <input v-model="addDescription" type="text" class="form-control" id="addDescription" placeholder="Task's description">
                  </div>
                </div>
              </div>
            </form>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="addTask()">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="container-fluid content" id="content">
  
      <Category 
        v-for="category in categories.data" 
        :key="category.id" 
        :category="category" 
        :tasks="tasks"
        @newLists="$emit('newLists')">
      </Category>

    </div>
  
  </div>

</template>

<script>
import axios from "axios"
import Category from "./Category"

export default {
  name: "Content",
  data() {
    return {
      server: "http://localhost:3000",
      addTitle: "",
      addDescription: ""
    }
  },
  components: {
    Category
  },
  props: ['tasks', 'categories'],
  methods: {
    addTask() {
      axios({
        method: "POST",
        url: this.server+"/tasks",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title: this.addTitle,
          description: this.addDescription,
          UserId: this.addUserId
        }
      })
      .then(response => {
        this.$emit('movePage', 'logedin')
        this.$emit('newLists')
        this.addTitle = ""
        this.addDescription = ""
      })
      .catch(err => {
        this.errorMsg = err.response.data.message
      })
    },
    logout() {
      localStorage.clear()
      this.$emit('movePage', 'login')
    }
  },
  created() {
    this.$emit("newLists")
  }
}
</script>

<style>

</style>