import Vue from "vue"
import App from "./App.vue"
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)

// import GoogleAuth from 'vue-google-oauth2'

// const gauthOption = {
//   clientId: '155203986001-n9r7d1h5qdrg71bcg0qu1lj53eeaeo62.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }
// Vue.use(GoogleAuth, gauthOption)

new Vue ({
  render: h => h(App)
})
.$mount("#app")

