<template>
  <div class="auth-page">
    <h1 class="auth-header">Sign in</h1>
    <p class="auth-subheader">
      <router-link class="link" to="/register">
        Need an account?
      </router-link>
    </p>
    <form @submit.prevent="signInEmail" class="auth-form">
      <div class="input-group">
        <input v-model="email" class="auth-input" type="email" placeholder="Email" label="Email" required>
      </div>
      <div class="input-group">
        <input v-model="password" class="auth-input" type="password" placeholder="Password" label="Password" required>
      </div>
      <!--        TODO: Position and resize -->
      <div class="input-group">
        <div class="auth-provider" @click="signInGoogle">
<!--          <img src="../assets/google-brands.svg" class="auth-provider-icon">-->
          Sign in with Google
        </div>
      </div>
      <!--        TODO: Positioning-->
      <div class="auth-footer">
        <div v-if="this.errors.length">
          <ul class="auth-errors">
            <li v-bind:key="error" v-for="error in errors"> {{ error }}</li>
          </ul>
        </div>
        <router-link class="link auth-forgot" to="/register">
          Forgot your password?
        </router-link>
        <button class="auth-submit-btn" type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { db, Timestamp } from '../database'

export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    signInEmail: function () {
      this.errors = []
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(_ => {
          db.doc(`users/${firebase.auth().currentUser.uid}`).get()
            .then(userSnap => {
              this.$store.dispatch('userSignIn', userSnap.data())
              this.$router.push('/notes')
            })
            .catch(_ => {
              this.dispatch('userSignOut')
              firebase.auth().signOut()
              this.errors.push('Something went wrong, please try again later')
            })
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/user-not-found': {
            }
            // eslint-disable-next-line no-fallthrough
            case 'auth/wrong-password': {
              this.errors.push('Wrong email or password')
              break
            }
            case 'auth/invalid-email': {
              this.errors.push('Invalid email address')
            }
          }
        })
    },
    signInGoogle: function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(success => {
          db.doc(`users/${firebase.auth().currentUser.uid}`).get()
            .then(userSnap => {
              if (userSnap.exists) {
                this.$store.dispatch('userSignIn', userSnap.data())
                this.$router.push('/notes')
              } else {
                userSnap.ref.set({
                  name: firebase.auth().currentUser.displayName,
                  email: firebase.auth().currentUser.email,
                  created: Timestamp.now(),
                  photoURL: firebase.auth().currentUser.photoURL
                }).then(_ => {
                  userSnap.ref.get().then(updatedSnap => {
                    this.$store.dispatch('userSignIn', updatedSnap.data())
                    this.$router.push('/notes')
                  }).catch(_ => {
                    this.errors.push('Something went wrong, please try again later')
                    this.$store.dispatch('userSignOut')
                  })
                }).catch(_ => {
                  this.errors.push('Something went wrong, please try again later')
                  this.$store.dispatch('userSignOut')
                })
              }
            })
            .catch(_ => {
              this.dispatch('userSignOut')
              firebase.auth().signOut()
              this.errors.push('Something went wrong, please try again later')
            })
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/account-exists-with-different-credential': {
              this.errors = ['Account already exists, but is not linked with Google']
              break
            }
            case 'auth/popup-blocked': {
              this.errors = ['Sign in popup blocked by browser']
              break
            }
            case 'auth/cancelled-popup-request': {
            }
            // eslint-disable-next-line no-fallthrough
            case 'auth/popup-closed-by-user': {
              this.errors = []
              break
            }
            default: {
              this.errors = ['Something went wrong, please try again later']
            }
          }
        })
    }
  }
}
</script>

<style scoped>
  .auth-provider {
    width: 100%;
    background-color: #f2f2f2;
    border: 1px solid lightgrey;
    border-radius: 5px;
    position: inherit;
    line-height: 4.1rem;
    font-weight: 500;
    font-size: 1.5rem;
  }

  .auth-provider-icon {
    width: 10%;
    background-color: rgba(0, 0, 0, 0);
    float: left !important;
    margin: .6rem;
  }
</style>
