import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { db } from '../database'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    appTitle: 'Memo Lite',
    error: null,
    user: null,
    notes: []
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
      console.log(state.error)
    },
    setUser (state, payload) {
      state.user = payload
    },
    ...vuexfireMutations
  },
  actions: {
    userSignIn: function ({ commit }, payload) {
      commit('setUser', payload)
      this.dispatch('bindNotes')
    },
    bindNotes: firestoreAction(({ bindFirestoreRef }) => {
      const currUser = firebase.auth().currentUser

      const query = db.collection('notes')
        .where('author', 'array-contains', db.doc(`users/${currUser.uid}`))
        .orderBy('created', 'desc')
      return bindFirestoreRef('notes', query)
    }),
    unbindNotes: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('notes')
    }),
    autoSignIn: function ({ commit }, payload) {
      commit('setUser', payload)
      this.dispatch('bindNotes')
    },
    userSignOut: function ({ commit }) {
      commit('setUser', null)
      this.dispatch('unbindNotes')
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
