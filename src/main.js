import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from './firebaseConfig.js'
import './assets/scss/app.scss'

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    console.log(user)
    // if (user) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
