<template>
  <div>

    <!-- <div v-if="errorMsg" id="error" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Error</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {{errorMsg}}
          </div>
        </div>
      </div>
    </div> -->


    <div class="container-fluid" id="login-container">

      <!-- Navbar -->
      <nav class="navbar navbar-dark" id="navbar-login">
        <div class="container-fluid">
          <h2><a class="navbar-brand">Kanban App</a></h2>
        </div>
      </nav>

      <!-- Form Login -->
      <div class="container-fluid">

        <form id="login-form" method="post" @submit.prevent="login()">
          <div class="card">
            <h3 class="card-header">Log In</h3>
            <div class="card-body">
              <h5 v-if="errorMsg" id="error">{{errorMsg}}</h5>
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input type="email" v-model="emailLogin" class="form-control" id="email" placeholder="Enter your Email Address here">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" v-model="passwordLogin" class="form-control" id="password" placeholder="Enter your Password here">
              </div>
              <p>Don't have an account ? <a href="#" @click.prevent="$emit('movePage', 'register')">Register</a> here</p>
              <button type="submit" class="btn btn-primary">Log In</button>
              <h3 id="or">Or</h3>
              <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError"
                class="btn btn-outline-primary">
                Sign in with Google
              </g-signin-button>
            </div>
          </div>
        </form>

      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios"
import GoogleSignInButton from 'vue-google-signin-button-directive'

export default {
  name: "LogIn",
  data() {
    return {
      server: "http://localhost:3000",
      emailLogin: "",
      passwordLogin: "",
      errorMsg: "",
      googleSignInParams: {
        client_id: '155203986001-n9r7d1h5qdrg71bcg0qu1lj53eeaeo62.apps.googleusercontent.com'
      }
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
        this.errorMsg = err.response.data.message
        this.emailLogin = ""
        this.passwordLogin = ""
      })
    },
    onSignInSuccess (idToken) {
      axios({
        method: "POST",
        url: this.server+`/loginGoogle`,
        data: {
          id_token: idToken
        }
      })
      .then(data => {
        localStorage.setItem('access_token', data.data.access_token)
        this.$emit("movePage", "logedin")
      })
      .catch(err => {
        console.log(err);
      })
    },
    onSignInError (error) {
      console.log(error)
    }
  }
}

</script>

<style scoped>
  #or {
    margin-left: 25px;
  }
  #error {
    color: red;
  }
</style>