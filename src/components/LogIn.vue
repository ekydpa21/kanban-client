<template>
  <div>

    <div class="container-fluid" id="login-container">

      <!-- Navbar -->
      <nav class="navbar navbar-dark" id="navbar-login">
        <div class="container-fluid">
          <h2><a class="navbar-brand">Kanban</a></h2>
        </div>
      </nav>

      <!-- Form Login -->
      <div class="container-fluid">

        <form id="login-form" method="post" @submit.prevent="login()">
          <div class="card">
            <h3 class="card-header">Log In</h3>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input type="email" v-model="emailLogin" class="form-control" id="email" placeholder="Enter your Email Address here">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" v-model="passwordLogin" class="form-control" id="password" placeholder="Enter your Password here">
              </div>
              <h5>Don't have an account ? <a href="#" @click.prevent="$emit('movePage', 'register')">Register</a> here</h5>
              <button type="submit" class="btn btn-primary">Log In</button>
            </div>
          </div>
        </form>

      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "LogIn",
  data() {
    return {
      server: "http://localhost:3000",
      emailLogin: "",
      passwordLogin: ""
    }
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: this.server+"/login",
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
      .then(response => {
        localStorage.setItem("access_token", response.data.access_token)
        this.emailLogin = ""
        this.passwordLogin = ""
        this.$emit("movePage", "logedin")
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