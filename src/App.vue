<template>
  <div class="container-fluid">

    <LogIn 
      v-if="page === 'login'" 
      @movePage="movePage">
    </LogIn>

    <Register 
      v-if="page === 'register'" 
      @movePage="movePage">
    </Register>

    <Content 
      v-if="page === 'logedin'" 
      @movePage="movePage"
      @newLists="allTasks"
      :tasks="tasks"
      :categories="categories">
    </Content>

  </div>
</template>

<script>
import axios from "axios"
import LogIn from "./components/LogIn"
import Register from "./components/Register"
import Content from "./components/Content"

export default {
  name: "App",
  data() {
    return {
      server: "https://kanbap.herokuapp.com",
      page: "login",
      tasks: [],
      categories: []
    }
  },
  components: {
    LogIn,
    Register,
    Content
  },
  methods: {
    movePage(moveTo) {
      this.page = moveTo
    },
    checkAuth() {
      if (localStorage.getItem("access_token")) {
        this.movePage("logedin")
        this.allTasks()
        this.allCategories()
      } else {
        this.movePage("login")
      }
    },
    allTasks() {
      axios({
        method: "GET",
        url: this.server+"/tasks",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(response => {
        this.tasks = response.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    allCategories() {
      axios({
        method: "GET",
        url: this.server+"/categories",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(response => {
        this.categories = response.data
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
        this.checkAuth()
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.checkAuth()
  }
}
</script>

<style>

</style>