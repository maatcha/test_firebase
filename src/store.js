import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from './firebaseConfig.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {}
  },
  mutations: {
    SET_CURRENT_USER(state, currentUser) {
      state.currentUser = currentUser
    },
    SET_USER_PROFILE(state, userProfile) {
      state.userProfile = userProfile
    }
  },
  actions: {
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
