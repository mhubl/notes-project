<template>
  <div class="viewer">
    <div class="top-bar">
      <h1 class="header-title">Note viewer</h1>
    </div>
    <div>
      <div class="ta-container">
        <div class="viewer-title">
          <h1>{{ note.title }}</h1>
        </div>
        <div class="viewer-text">
          <p>{{ note.text }}</p>
        </div>
        <div class="viewer-footer">
          <div class="viewer-edit">
            <input class="viewer-share-button" type="email" v-bind="shareUser" placeholder="Share">
            <button @click="shareNote">Share</button>
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
      db.doc(`notes/${this.$route.params.id}`).get()
        .then(noteSnap => {
          db.collection('users').where('email', '==', this.shareUser).get()
            .then(userSnap => {
              const authors = noteSnap.data().author
              if (this.shareUser !== '') {
                console.log(authors)
                authors.push(userSnap.docs[0].ref)
                console.log(authors)
              }
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
        }
        )
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
