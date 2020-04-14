import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.config.productionTip = false;

const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    // eslint-disable-next-line no-new
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
      created() {
        if (firebaseUser) {
          store.dispatch('autoSignIn', firebaseUser)
        }
      }
    });
    unsubscribe()
  });
