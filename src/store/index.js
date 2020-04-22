import Vue from 'vue'
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
    }
  },
  actions: {
    userSignIn: function ({ commit }, payload) {
      commit('setUser', payload)
    },
    autoSignIn: function ({ commit }, payload) {
      commit('setUser', payload)
    },
    userSignOut: function ({ commit }) {
      commit('setUser', null)
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
    // setUserData: firestoreAction(({ bindFirestoreRef }, uid) => {
    //   return bindFirestoreRef('userData', db.doc(`users/${uid}`))
    // })
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
