<template>
  <div class="auth-page">
    <h1 class="auth-header">Sign up</h1>
    <p class="auth-subheader">
      <router-link class="link" to="/login">
        Have an account?
      </router-link>
    </p>
    <!-- TODO: Add checks (and warnings) to verify passwords and emails match and satisfy security rules -->
    <form class="auth-form" @submit.prevent="checkForm" >
      <div class="input-group">
        <input v-model="username" class="auth-input" type="text" placeholder="Username" required>
      </div>
      <div class="input-group">
        <input v-model="email" class="auth-input" type="email" placeholder="Email" required>
      </div>
      <div class="input-group">
        <input v-model="repeatEmail" class="auth-input" type="email" placeholder="Repeat email" required>
      </div>
      <div class="input-group">
        <input v-model="password" class="auth-input" type="password" placeholder="Password" required>
      </div>
      <div class="input-group">
        <input v-model="repeatPassword" class="auth-input" type="password" placeholder="Repeat password" required>
      </div>
      <!--        TODO: Positioning-->
      <div class="auth-footer">
        <div v-if="this.errors.length">
          <ul class="auth-errors">
            <li v-bind:key="error" v-for="error in errors"> {{ error }}</li>
          </ul>
        </div>
        <button class="auth-submit-btn">Sign up</button>
      </div>
    </form>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { db, Timestamp } from '../database'

export default {
  name: 'Register',
  data: function () {
    return {
      username: '',
      email: '',
      repeatEmail: '',
      password: '',
      repeatPassword: '',
      errors: []
    }
  },
  methods: {
    checkForm () {
      this.errors = []
      if (!this.validateEmail()) {
        this.errors.push('Invalid email address')
      }
      if (!this.validateUsername()) {
        this.errors.push('Username must be at least 6 characters long')
      }
      if (this.email !== this.repeatEmail) {
        this.errors.push('Emails don\'t match')
      }
      if (!this.validatePassword()) {
        this.errors.push('The password must be at least 8 characters long')
      }
      if (this.password !== this.repeatPassword) {
        this.errors.push('Passwords don\'t match')
      }
      if (this.errors.length === 0) {
        this.createAccount()
      }
    },
    validateEmail () {
      // this seems to be done the proper way by the browser already
      return this.email.length > 0
    },
    validatePassword () {
      return this.password.length >= 8
    },
    validateUsername () {
      return this.username.length >= 6
    },
    createAccount () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(success => {
          firebase.auth().currentUser.updateProfile({ displayName: this.displayName })
          const userRef = db.doc(`users/${firebase.auth().currentUser.uid}`)
          userRef.set(
            {
              name: this.username,
              email: this.email,
              created: Timestamp.now(),
              photoURL: null
            }
          ).then(_ => {
            userRef.get()
              .then(userSnap => {
                this.$store.dispatch('userSignIn', userSnap.data())
                this.$router.push('/notes')
              })
              .catch(_ => {
                this.signOut()
                this.errors.push('Something went wrong, please try again later')
              })
          }).catch(_ => {
            this.errors.push('Something went wrong, please try again later')
          })
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use': {
              this.errors.push('This email address is already in use')
              break
            }
            case 'auth/invalid-email': {
              this.errors.push('This email address is invalid')
              break
            }
            case 'auth/operation-not-allowed': {
              this.errors.push('Not allowed')
              break
            }
            case 'auth/weak-password': {
              this.errors.push('The password is too weak')
              break
            }
            default: {
              this.errors.push('An unknown error has occured')
            }
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
