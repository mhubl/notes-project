<template>
  <div class="viewer">
    <div class="top-bar">
      <h1 class="header-title">Note viewer</h1>
    </div>
    <div>
      <div class="ta-container">
        <div class="viewer-title">
          <h1>{{ (note == null) ? '' : note.title }}</h1>
        </div>
        <div class="viewer-text">
          <p>{{ (note == null) ? '' : note.text }}</p>
        </div>
        <div class="viewer-footer">
          <div class="viewer-edit">
            <input type="email" v-model="shareUser" placeholder="Share">
            <button class="viewer-share-button" @click="shareNote">Share</button>
          </div>
          <button class="delete-btn" @click="deleteNote">Delete</button>
          <button><router-link to="/notes">Go back</router-link></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../database'
export default {
  name: 'Viewer',
  data () {
    return {
      note: null,
      shareUser: null
    }
  },
  firestore: function () {
    return {
      note: db.doc(`notes/${this.$route.params.id}`)
    }
  },
  methods: {
    shareNote: function () {
      if (this.shareUser == null || this.shareUser === '') {
        return false
      }
      db.doc(`notes/${this.$route.params.id}`).get()
        .then(noteSnap => {
          db.collection('users').where('email', '==', this.shareUser).get()
            .then(userSnap => {
              if (userSnap.empty) {
                alert('User not found')
                return false
              }
              const authors = noteSnap.data().author
              authors.push(userSnap.docs[0].ref)
              noteSnap.ref.update('author', authors).then(success => {
                this.$router.push('/notes')
              })
            })
        })
    },
    deleteNote: function () {
      db.doc(`notes/${this.$route.params.id}`).delete()
        .then(success => {
          this.$router.push('/notes')
        })
    }
  }
}
</script>

<style scoped>
  .ta-container {
    display: grid;
    text-align: left;
    float: left;
    margin-left: 7rem;
    width: 90%;
  }

  .viewer-edit {
    margin: .25rem;
  }

  .viewer-title {
    padding: .5rem 1rem;
    height: 100px;
    line-height: 25px;
    font-size: 2.5rem;
    font-weight: 600;
  }

  .viewer-text {
    padding: 1rem;
    height: 420px;
    margin-top: 1rem;
    font-size: 1.25rem;
  }

  button {
    margin: .25rem;
  }

  .viewer-share-button {
    padding: 1rem;
  }

  a {
    text-decoration: none;
    color: white;
  }

  .viewer-footer {
    display: flex;
    float: right;
    /*margin-left: 60rem;*/
  }

</style>
