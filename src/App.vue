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
      :tasks="tasks">
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
      server: "http://localhost:3000",
      page: "login",
      tasks: []
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
    }
  },
  created() {
    this.checkAuth()
  }
}
</script>

<style>

</style>