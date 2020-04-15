<template>
  <div class="notes-page">
    <div class="top-bar">
      <h1 class="header-title">Your notes</h1>
    </div>
    <div class="notes">
      <note
        v-for="note in unfilteredNotes"
        v-bind:key="note.id"
        v-bind:title="note.title"
        v-bind:text="note.text"
        v-bind:author="note.author"
        v-bind:created="note.created">
      </note>
    </div>
  </div>
</template>

<!-- Pomysl jest taki, ze masz na gorze bar z napisem Your Notes i opcjami wyszukiwania/filtrowania/widoku. Pod nim jest scrollowalna strona z lista notatek - nie cala strona (widac po scrollbarze).
     Jakbym mial rzucic jakims przykladem to przychodzi mi do glowy uklad plikow w google drive -->

<script>
import note from '../components/Note.vue'
// import * as firebase from 'firebase/app'
// import 'firebase/auth'
import { db } from '../database'

export default {
  name: 'Notes',
  components: { note },
  data () {
    return {
      dummynotes: [
        {
          id: 'AAAAA',
          title: 'Test title 1',
          text: 'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ',
          author: 'Test author',
          created: new Date(2020, 1, 17, 13, 21, 23).toUTCString()
        },
        {
          id: 'BBBBB',
          title: 'Test title 2',
          text: 'short example',
          author: 'Test author',
          created: new Date(2020, 3, 2, 8, 56, 39).toUTCString()
        },
        {
          id: 'CCCCC',
          title: 'Another test note',
          text: 'This note is a bit longer than the second, but still shorter than the first one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one one',
          author: 'Test author',
          created: new Date(2020, 3, 2, 8, 56, 39).toUTCString()
        },
        {
          id: 'DDDDD',
          title: 'test',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis justo at nisi consequat, ut tempus tellus venenatis. Nunc eu laoreet odio, in ultrices ligula. Nulla imperdiet turpis a elit tristique porttitor. Integer diam tortor, sagittis finibus viverra id, porta vel lorem. Aenean eu fringilla tortor, eget sollicitudin arcu. Nulla sagittis libero in laoreet congue. Maecenas aliquam id massa vitae consequat. Etiam mattis sapien et enim varius, sed facilisis arcu lacinia. Donec quis libero sit amet eros aliquam facilisis. Morbi. ',
          author: 'Test author',
          created: new Date(2020, 3, 2, 8, 56, 39).toUTCString()
        }
      ],
      unfilteredNotes: []
    }
  },
  firestore: {
    unfilteredNotes: db.collection('notes')
  },
  computed: {
    notes: function () {
      const res = []
      for (const note in this.notes) {
        if (note.author.uid === this.$store.state.user.uid) {
          res.push(note)
        }
      }
      return res
    }
  }
}
</script>

<style scoped>
  .notes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    left: 75px;
    top: 100px;
    position: absolute;
  }
  /*button {*/
  /*  width: 8rem;*/
  /*  height: 5rem;*/
  /*}*/
  /*.note-icon {*/
  /*  float: left;*/
  /*  width: 1rem;*/
  /*}*/
</style>
