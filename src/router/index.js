import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to.matched.some(x => x.meta.requiresAuth))
  if (to.matched[0].meta) {
    const requiresAuth = to.matched[0].meta.requireAuth

    // console.log(requiresAuth)
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
      next('/login')
    } else if (requiresAuth && currentUser) {
      console.log('logged in')
      next()
    } else {
      next()
    }
  }
})

export default router
