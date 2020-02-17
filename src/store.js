import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from './firebaseConfig.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: [],
    hiddenPosts: []
  },
  mutations: {
    SET_POSTS(state, posts) {
      if (posts) {
        state.posts = posts
      } else {
        state.posts = []
      }
    },
    SET_HIDDEN_POSTS(state, post) {
      if (post) {
        if (!state.hiddenPosts.some(x => x.id === post.id)) {
          state.hiddenPosts.unshift(post)
        }
      } else {
        state.hiddenPosts = []
      }
    },
    SET_CURRENT_USER(state, currentUser) {
      // console.log(currentUser)
      state.currentUser = currentUser
    },
    SET_USER_PROFILE(state, userProfile) {
      console.log(userProfile)
      state.userProfile = userProfile
    }
  },
  actions: {
    clearData({ commit }) {
      commit('SET_CURRENT_USER', null)
      commit('SET_USER_PROFILE', {})
      commit('SET_POSTS', [])
    },
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit('SET_USER_PROFILE', res.data())
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getters: {}
})
