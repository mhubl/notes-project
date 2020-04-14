import Vue from 'vue'
import router from '../router'
import Vuex from 'vuex'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.use(Vuex)
const firebaseConfig = {
  apiKey: 'AIzaSyC_62eSE0Rid96pb3e1lvvU1DNGqdYO7fw',
  authDomain: 'notes-ab306.firebaseapp.com',
  databaseURL: 'https://notes-ab306.firebaseio.com',
  projectId: 'notes-ab306',
  storageBucket: 'notes-ab306.appspot.com',
  messagingSenderId: '829803338758',
  appId: '1:829803338758:web:687585b579c189d8ac3787',
  measurementId: 'G-F1CTS91ZQB'
}
firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()

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
    setDb (state, payload) {
      state.db = payload
    },
    setNotes (state, payload) {
      state.notes = payload
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
    },
    updateNotes: function () {
      const userRef = db.doc('users/' + firebase.auth().currentUser.uid)
      db.collection('notes').where('author', '==', userRef)
        .get().then(snapshot => {
          const notes = []
          snapshot.forEach(function (doc) {
            const data = doc.data()
            const note = {}
            note.id = doc.id
            note.title = data.title
            note.text = data.text
            note.created = new Date(data.created.seconds * 1000).toLocaleString()
            notes.push(note)
          })
          this.commit('setNotes', notes)
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
