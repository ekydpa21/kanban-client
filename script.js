const app = new Vue({
  el: "#app",
  data: {
    page: "login",
    server: "http://localhost:3000",
    firstName: "",
    lastName: "",
    emailRegister: "",
    passwordRegister: "",
    emailLogin: "",
    passwordLogin: "",
    tasks: [],
    oneTask: [],
    addTitle: "",
    addDescription: "",
    addUserId: "",
    toBacklog: "Backlog",
    toTodo: "Todo",
    toDoing: "Doing",
    toDone: "Done",
  },
  methods: {
    movePage(page) {
      this.page = page
    },
    checkAuth() {
      if (localStorage.getItem("access_token")) {
        this.movePage("logedin")
        this.allTasks()
      } else {
        this.movePage("login")
      }
    },
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
        this.checkAuth()
        this.firstName = ""
        this.lastName = ""
        this.emailRegister = ""
        this.passwordRegister = ""
      })
      .catch(err => {
        console.log(err)
      })
    },
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
        this.checkAuth()
        this.emailLogin = ""
        this.passwordLogin = ""
      })
      .catch(err => {
        console.log(err)
      })
    },
    logout() {
      localStorage.clear()
      this.checkAuth()
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
    pickOne(id) {
      axios({
        method: "GET",
        url: this.server+`/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(response => {
        this.oneTask = response.data.data
      })
      .catch(err => {
        console.log(err)
      })
    },
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
        this.checkAuth()
        this.addTitle = ""
        this.addDescription = ""
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
    },
    backlog(id) {
      axios({
        method: "PATCH",
        url: this.server+`/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          category: this.toBacklog
        }
      })
      .then(response => {
        this.checkAuth()
      })
      .catch(err => {
        console.log(err)
      })
    },
    todo(id) {
      axios({
        method: "PATCH",
        url: this.server+`/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          category: this.toTodo
        }
      })
      .then(response => {
        this.checkAuth()
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
          category: this.toDoing
        }
      })
      .then(response => {
        this.checkAuth()
      })
      .catch(err => {
        console.log(err)
      })
    },
    done(id) {
      axios({
        method: "PATCH",
        url: this.server+`/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          category: this.toDone
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
})