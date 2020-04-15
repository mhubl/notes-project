import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { firestorePlugin } from 'vuefire'
// import { db } from './database'

Vue.config.productionTip = false
Vue.use(firestorePlugin)
// data() {
//   return
// }
// const methods = {}
// const firestore = {}

const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    // eslint-disable-next-line no-new
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
      created () {
        if (firebaseUser) {
          store.dispatch('autoSignIn', firebaseUser)
        }
      }
    })
    unsubscribe()
  })
