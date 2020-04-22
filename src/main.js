import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'firebase/auth'
import { firestorePlugin } from 'vuefire'
import { db } from './database'
import * as firebase from 'firebase'

Vue.config.productionTip = false
Vue.use(firestorePlugin)

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  router,
  store,
  methods: {
    signOut: function () {
      this.$store.dispatch('userSignOut')
      firebase.auth().signOut()
      if (router.currentRoute.path !== '/') {
        router.push('/')
      }
    }
  },
  firebase: function () {
    return {
      currUser: db.doc(`users/${firebase.auth().currentUser.uid}`)
    }
  },
  render: h => h(App)
})
