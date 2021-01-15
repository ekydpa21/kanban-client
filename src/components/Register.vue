<template>

  <div>

    <!-- <div v-if="errorMsg" id="error" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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

    <div class="container-fluid" id="register-container">

      <!-- Navbar -->
      <nav class="navbar navbar-dark" id="navbar-register">
        <div class="container-fluid">
          <h2><a class="navbar-brand">Kanban App</a></h2>
        </div>
      </nav>

      <!-- Form register -->
      <div class="container-fluid">

        <form id="register-form" method="post">
          <div class="card">
            <h3 class="card-header">Register</h3>
            <div class="card-body">
              <h5 v-if="errorMsg" id="error">{{errorMsg}}</h5>
              <div class="mb-3">
                <label class="form-label">First Name</label>
                <input v-model="firstName" type="text" class="form-control" id="firstName" placeholder="Enter your First Name here">
              </div>
              <div class="mb-3">
                <label class="form-label">Last Name</label>
                <input v-model="lastName" type="text" class="form-control" id="lastName" placeholder="Enter your Last Name here">
              </div>
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input v-model="emailRegister" type="email" class="form-control" id="email" placeholder="Enter your Email Address here">
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="passwordRegister" type="password" class="form-control" id="password" placeholder="Enter your Password here">
              </div>
              <p>Already have an account ? <a href="#" @click.prevent="$emit('movePage', 'login')">Log In</a> here</p>
              <button @click.prevent="register()" type="submit" class="btn btn-primary">Submit</button>
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
  name: "Register",
  data() {
    return {
      server: "http://localhost:3000",
      firstName: "",
      lastName: "",
      emailRegister: "",
      passwordRegister: "",
      errorMsg: ""
    }
  },
  methods: {
    register() {
      axios({
        method: "POST",
        url: this.server+"/register",
        data: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.emailRegister,
          password: this.passwordRegister
        }
      })
      .then(response => {
        this.$emit('movePage', 'login')
        this.firstName = ""
        this.lastName = ""
        this.emailRegister = ""
        this.passwordRegister = ""
      })
      .catch(err => {
        let msg = ""
        err.response.data.map(e => {
          msg += e + ", "
        })
        this.errorMsg = msg
        this.firstName = ""
        this.lastName = ""
        this.emailRegister = ""
        this.passwordRegister = ""
      })
    },
  }
}
</script>

<style scoped>
  #error {
    color: red;
  }
</style>