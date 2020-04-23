<template>
  <div class="creator">
    <div class="top-bar">
      <h1 class="header-title">Create a note</h1>
    </div>
  <form v-on:submit.prevent="addNote">
    <div class="ta-container">
      <textarea class="title-input" v-model="title" placeholder="Title" required></textarea>
      <textarea class="text-input" v-model="text" placeholder="Your note" required></textarea>
      <input class="share-input" type="email" v-model="shareUser" placeholder="Share with">
    </div>
    <button type="submit">Save</button>
  </form>
  </div>
</template>

<script>
import { db, Timestamp } from '@/database'
import * as firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'creator',
  data: function () {
    return {
      title: '',
      text: '',
      shareUser: ''
    }
  },
  methods: {
    addNote: function () {
      if (this.shareUser !== '') {
        db.collection('users').where('email', '==', this.shareUser).get()
          .then(userSnap => {
            console.log(userSnap)
            const userRef = userSnap.docs[0].ref
            const users = [userRef, db.doc('users/' + firebase.auth().currentUser.uid)]
            db.collection('notes').add({
              title: this.title,
              text: this.text,
              author: users,
              created: Timestamp.now()
            })
              .then(success => {
                console.log('Added to db') // TODO: remove before prod
                this.$router.push('/notes')
              })
          })
      } else {
        db.collection('notes').add({
          title: this.title,
          text: this.text,
          author: [db.doc('users/' + firebase.auth().currentUser.uid)],
          created: Timestamp.now()
        }).then(success => {
          console.log('Added to db') // TODO: remove before prod
          this.$router.push('/notes')
        }
        ).catch(error => {
          console.log(error)
        }
        )
      }
    }
  }
}
</script>

<style scoped>
form {
  margin-top: 1rem;
  left: 100px;
  position: relative;
  width: 94%;
  height: 80%;
}

.ta-container {
  display: grid;
}

.title-input {
  padding: .5rem 1rem;
  height: 100px;
  line-height: 100px;
  font-size: 2.5rem;
  font-weight: 600;
}

.text-input {
  padding: 1rem;
  height: 450px;
  margin-top: 1rem;
  font-size: 1.25rem;
}

button {
  float: right;
  padding: .7rem 2rem;
}

textarea {
  /*border: 1px solid lightgrey;*/
  border: 0px;
  border-radius: 5px;
  resize: none;
  background-color: #fbfbfb;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
