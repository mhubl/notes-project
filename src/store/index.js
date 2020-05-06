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
    notes: [],
    filters: [
      {
        name: 'eventOnly',
        check: function (note) {
          return note.isEvent
        }
      }
    ]
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
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
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .catch(err => {
            const errCode = (err.code == null || err.code === '') ? '00000' : err.code
            alert('Sign out failed\nError code: ' + errCode)
          })
      }
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
    },
    getNotes: function (state) {
      return state.notes
    },
    filterNotes: function (state, filters) {
      let filteredNotes = this.getNotes()
      for (const filterName in filters) {
        filteredNotes = this.applyFilter(filterName, filteredNotes)
      }
      return filteredNotes
    },
    applyFilter: function (state, filterName, notes = state.notes) {
      const filter = this.getFilter(filterName)
      const filteredNotes = []
      for (const note in notes) {
        if (filter.check(note)) {
          filteredNotes.push(note)
        }
      }
      return filteredNotes
    },
    getFilter: function (state, filterName) {
      for (const filter in state.filters) {
        if (filter.name === filterName) return filter
      }
      return false
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
