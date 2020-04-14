import Vue from 'vue'
import router from '../router'
import Vuex from 'vuex'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.use(Vuex);
const firebaseConfig = {
  apiKey: 'AIzaSyC_62eSE0Rid96pb3e1lvvU1DNGqdYO7fw',
  authDomain: 'notes-ab306.firebaseapp.com',
  databaseURL: 'https://notes-ab306.firebaseio.com',
  projectId: 'notes-ab306',
  storageBucket: 'notes-ab306.appspot.com',
  messagingSenderId: '829803338758',
  appId: '1:829803338758:web:687585b579c189d8ac3787',
  measurementId: 'G-F1CTS91ZQB'
};
firebase.initializeApp(firebaseConfig);

const store = new Vuex.Store({
  state: {
    appTitle: 'Memo Lite',
    error: null,
    user: null,
    db: firebase.firestore()
  },
  mutations: {
    setError(state, payload) {
      state.error = payload;
      console.log(state.error)
    },
    setUser(state, payload) {
      state.user = payload
    },
    setDb(state, payload) {
      state.db = payload
    }
  },
  actions: {
    userSignIn: function ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((success) => {
          commit('setUser', firebase.auth().currentUser);
          router.push('/notes')
        })
        .catch((error) => {
          commit('setError', error)
        })
    },
    autoSignIn: function ({commit}, payload) {
      commit('setUser', firebase.auth().currentUser)
    },
    userSignOut: function ({commit}) {
      commit('setUser', null);
      firebase.auth().signOut()
        .catch((error) => {
          commit('setError', error)
        })
    }
  },
  getters: {
    isAuthenticated: function (state) {
      return state.user !== null && state.user !== undefined
    }
  }
});

export default store
