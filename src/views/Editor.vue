<template>
<div class="page-wrapper">
  <div class="top-bar">
    <h1 class="top-header">{{ header }}</h1>
  </div>
  <hr class="top-hr">
  <form @submit.prevent="checkData" @load="updateFields" class="edit-body">
    <div class="edit-inputs">
      <textarea v-model="title" class="edit-title" placeholder="Your title" required></textarea>
      <textarea v-model="text" class="edit-text" placeholder="Your note"></textarea>
    </div>
    <div class="edit-settings">
      <div class="date-settings">
        <div class="allday-container">
          <label class="edit-allday">
            <input v-model="allDay" class="edit-allday" type="checkbox">
            All day
          </label>
        </div>
        <ul class="date-picker">
          <li>
            <label v-if="!allDay" for="edit-start" class="date-label">Start time</label>
            <label v-else for="edit-start" class="date-label">Start date</label>
          </li>
          <li>
            <input v-model="startDate" class="edit-date" id="edit-start" type="date" :max="endDate">
          </li>
          <li>
            <input v-if="!allDay" v-model="startTime" class="edit-date" type="time" step="1800">
          </li>
          <li>
            <label v-if="!allDay" for="edit-end" class="date-label">End time</label>
            <label v-else for="edit-end" class="date-label">End date</label>
          </li>
          <li>
            <input v-model="endDate" class="edit-date" id="edit-end" type="date" :min="startDate">
          </li>
          <li>
            <input v-if="!allDay" v-model="endTime" class="edit-date" type="time" step="1800">
          </li>
        </ul>
      </div>
      <div class="submit-settings">
        <ul>
          <li>
            <label for="share-with">Share with</label>
          </li>
          <li>
            <input v-model="shareWith" class="edit-share" id="share-with" type="email">
          </li>
          <li>
            <button class="submit-button" type="submit">Submit</button>
            <button v-if="isEditor" @click="deleteNote" class="submit-button" type="button">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import { db, Timestamp } from '../database'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Editor',
  methods: {
    getStartTs: function () {
      let start
      if (this.allDay) {
        start = Date.parse(this.startDate)
      } else {
        const datetime = this.startDate + 'T' + this.startTime
        start = Date.parse(datetime)
      }
      return Timestamp.fromMillis(start)
    },
    getEndTs: function () {
      let end
      if (this.allDay) {
        end = Date.parse(this.endDate)
      } else {
        const datetime = this.endDate + 'T' + this.endTime
        end = Date.parse(datetime)
      }
      return Timestamp.fromMillis(end)
    },
    updateNote: function (authors, id = null) {
      if (id === null) id = this.$route.params.id
      db.collection('notes').doc(id).get()
        .then(snap => {
          const allAuthors = snap.data().author
          authors.forEach(author => {
            if (!allAuthors.includes(author)) {
              allAuthors.push(author)
            }
          })
          const data = {
            author: allAuthors,
            title: this.title,
            text: this.text,
            isEvent: this.isEvent
          }
          if (this.isEvent) {
            data.start = this.getStartTs()
            data.end = this.getEndTs()
            data.allDay = this.allDay
          }
          snap.ref.update(data)
            .then(_ => {
              this.$router.push('/notes')
            })
            .catch(_ => {
              alert('Something went wrong')
            })
        })
        .catch(_ => {
          alert('Something went wrong')
        })
    },
    createNote: function (authors) {
      const allAuthors = []
      authors.forEach(author => {
        allAuthors.push(author)
      })
      const data = {
        author: allAuthors,
        title: this.title,
        text: this.text,
        isEvent: this.isEvent,
        created: Timestamp.now()
      }
      if (this.isEvent) {
        data.start = this.getStartTs()
        data.end = this.getEndTs()
        data.allDay = this.allDay
      }
      db.collection('notes').add(data).then(note => {
        this.updateNote(authors, note.id)
      }).catch(_ => {
        alert('Something went wrong')
      })
    },
    checkData: function () {
      if (this.allDay) {
        if (this.startDate == null || this.endDate == null || this.startDate === '' || this.endDate === '') {
          return false
        }
      } else {
        const anyPicked = this.startDate != null || this.endDate != null || this.startTime != null || this.endTime != null
        const anyPicked2 = this.startDate !== '' || this.endDate !== '' || this.startTime !== '' || this.endTime !== ''
        const anyNull = this.startDate == null || this.endDate == null || this.startTime == null || this.endTime == null
        if (anyPicked && anyPicked2 && anyNull) return false
      }

      const authors = [db.doc(`users/${firebase.auth().currentUser.uid}`)]
      if (this.shareWith) {
        db.collection('users').where('email', '==', this.shareWith).get()
          .then(snap => {
            if (snap.empty) {
              alert(`No user with email ${this.shareWith} exists`)
              return false
            }
            authors.push(db.collection('users').doc(snap.docs[0].id))
          })
          .catch(_ => {
            alert('Something went wrong')
            return false
          })
      }

      if (this.isEditor) {
        this.updateNote(authors)
      } else {
        this.createNote(authors)
      }
    },
    updateFields: function () {
      const id = this.$route.params.id
      if (id == null) {
        return
      }
      db.collection('notes').doc(id).get().then(snap => {
        if (!snap.exists) {
          alert('Note doesn\'t exist')
          this.$router.push('/notes')
          return false
        }
        const data = snap.data()
        this.title = data.title
        this.text = data.text
        if (data.isEvent) {
          this.allDay = data.allDay
          const start = data.start.toDate()
          this.startDate = ('000' + start.getFullYear()).slice(-4) + '-' + ('0' + (start.getMonth() + 1)).slice(-2) + '-' + ('0' + start.getDate()).slice(-2)
          this.startTime = ('0' + start.getHours()).slice(-2) + ':' + ('0' + start.getMinutes()).slice(-2)
          const end = data.end.toDate()
          this.endDate = ('000' + end.getFullYear()).slice(-4) + '-' + ('0' + (end.getMonth() + 1)).slice(-2) + '-' + ('0' + end.getDate()).slice(-2)
          this.endTime = ('0' + end.getHours()).slice(-2) + ':' + ('0' + end.getMinutes()).slice(-2)
        }
      })
    },
    deleteNote: function () {
      const confirmation = confirm('Do you really want to delete this note? It will not be recoverable.')
      if (!confirmation) {
        return false
      }
      const id = this.$route.params.id
      db.collection('notes').doc(id).delete()
        .then(_ => {
          this.$router.push('/notes')
        })
        .catch(_ => {
          alert('Something went wrong')
        })
    }
  },
  data: function () {
    return {
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      allDay: false,
      shareWith: null,
      title: null,
      text: ''
    }
  },
  created () {
    this.updateFields()
  },
  computed: {
    isEditor: function () {
      return this.$router.currentRoute.path !== '/create'
    },
    isEvent: function () {
      return this.startDate != null && this.startDate !== '' && this.endDate != null && this.endDate !== ''
    },
    header: function () {
      return (this.isEditor) ? 'Edit your note' : 'Create a new note'
    }
  }
}
</script>

<style scoped>
.edit-body {
  margin-top: 120px;
  height: 200px;
}
.edit-inputs {
  display: grid;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.allday-container {
  margin: 15px
}

.edit-title {
  font-family: inherit;
  margin-bottom: 10px;
  padding: 7px 7px;
  font-size: 1.75rem;
  color: inherit;
  line-height: 1.25rem;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid var(--accent-color);
  border-radius: 5px 5px 0 0;
  background-color: #fdfdfd;
}

.edit-text {
  font-family: inherit;
  color: inherit;
  margin-bottom: 10px;
  padding: 7px 7px;
  border: none;
  font-size: 1.25rem;
  height: 90%;
  border-radius: 5px;
  background-color: #fdfdfd;
}

.edit-text:focus, .edit-title:focus {
  outline: none;
}

.edit-settings {
  display: flex;
}

.submit-settings {
  margin-left: auto;
  margin-top: 50px;
  margin-right: 2rem;
  padding: 15px;
}

.submit-button {
  padding: 5px 10px;
  float: right;
  margin-top: 100px;
}

input.edit-allday {
  width: 13px;
  height: 13px;
  padding: 0;
  margin: 0;
  vertical-align: bottom;
  position: relative;
  top: -1px;
  *overflow: hidden;
}

.edit-share {
  width: 200px;
}

.date-label {
  margin-top: 15px;
}
label#edit-start, label#edit-date-start {
  margin-top: 0;
}

label.edit-allday {
  display: block;
  padding-left: 15px;
  text-indent: -15px;
  float: none;
}

label {
  float: left;
}

li {
  display: flow-root;
}

.date-settings {
  display: grid;
  margin-top: 50px;
  padding: 15px;
}

.edit-date {
  font-family: inherit;
  width: 125px;
  margin-top: 1px;
}
</style>
