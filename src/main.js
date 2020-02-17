import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as fb from './firebaseConfig.js'
import './assets/scss/app.scss'

Vue.config.productionTip = false

// let app
fb.auth.onAuthStateChanged(user => {
  // if (!app) {
  // console.log(user)

  if (user) {
    store.commit('SET_CURRENT_USER', user)
    store.dispatch('fetchUserProfile')
    fb.postsCollection
      .orderBy('createdOn', 'desc')
      .onSnapshot(querySnapshot => {
        let createdByCurrentUser
        if (querySnapshot.docs.length) {
          createdByCurrentUser =
            store.state.currentUser.uid ===
            querySnapshot.docChanges()[0].doc.data().userId
              ? true
              : false
        }
        if (
          querySnapshot.docChanges().length !== querySnapshot.docs.length &&
          querySnapshot.docChanges()[0].type === 'added' &&
          !createdByCurrentUser
        ) {
          let post = querySnapshot.docChanges()[0].doc.data()
          post.id = querySnapshot.docChanges()[0].doc.id
          store.commit('SET_HIDDEN_POSTS', post)
        } else {
          let postsArray = []
          querySnapshot.forEach(doc => {
            let post = doc.data()
            post.id = doc.id
            postsArray.push(post)
          })

          store.commit('SET_POSTS', postsArray)
        }
      })
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  // }
})

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
