import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Notes from '../views/Notes.vue'
import Editor from '../views/Editor.vue'
import Calendar from '../views/Calendar.vue'

import * as firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresNoAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresNoAuth: true }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: { requiresAuth: true }
  }, {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    meta: { requiresAuth: true }
  }, {
    path: '/edit/:id',
    name: 'Editor',
    component: Editor,
    meta: { requiresAuth: true }
  }, {
    path: '/create',
    name: 'Creator',
    component: Editor,
    meta: { requiresAuth: true }
  }
  // , {
  //   path: '/viewer/:id',
  //   name: 'Viewer',
  //   component: Viewer,
  //   meta: { requiresAuth: true }
  // }, {
  //   path: '/creator',
  //   name: 'Creator',
  //   component: Creator,
  //   meta: { requiresAuth: true }
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // const requiresNoAuth = to.matched.some(record => record.meta.requiresNoAuth)
  const isAuthenticated = firebase.auth().currentUser !== null
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
  if (isAuthenticated && to.path === '/') {
    next('/notes')
  }
  if (!isAuthenticated && to.path === '/') {
    next('/login')
  }
})

export default router
