import Vue from 'vue'
import router from '../router'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { db } from '../database'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    appTitle: 'Memo Lite',
    error: null,
    user: null
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
      console.log(state.error)
    },
    setUser (state, payload) {
      state.user = payload
      state.user.displayName = 'John Smith'
    }
  },
  actions: {
    userSignIn: function ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((success) => {
          commit('setUser', firebase.auth().currentUser)
          router.push('/notes')
        })
        .catch((error) => {
          commit('setError', error)
        })
    },
    autoSignIn: function ({ commit }, payload) {
      commit('setUser', firebase.auth().currentUser)
    },
    userSignOut: function ({ commit }) {
      commit('setUser', null)
      firebase.auth().signOut()
        .catch((error) => {
          commit('setError', error)
        })
    },
    userRegister: function ({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          addCurrentUserToDatabase({
            email: payload.email,
            name: payload.username,
            created: firebase.firestore.Timestamp.now(),
            photoURL: null
          })
        }
        )
        .catch(error => {
          commit('setError', error)
        })
    }
  },
  getters: {
    isAuthenticated: function (state) {
      return state.user !== null && state.user !== undefined
    }
  }
})

export default store

function addCurrentUserToDatabase (data) {
  db.collection('users').doc(firebase.auth().currentUser.uid).get(doc => {
    if (!doc.exists) {
      doc.set(data)
    }
  })
}