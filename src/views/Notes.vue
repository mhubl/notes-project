<template>
  <div class="notes-page">
    <div class="notes-top">
      <h1 class="header-title">Your notes</h1>
    </div>
    <div class="notes">
      <note
        v-for="note in dummynotes"
        v-bind:key="note.id"
        v-bind:title="note.title"
        v-bind:files="note.files"
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
  import note from './Note.vue'
  // import * as firebase from 'firebase/app'
  // import 'firebase/firestore'
  // import 'firebase/auth'

  export default {
    name: 'Notes',
    components: {note},
    data: function () {
      return {
        dummynotes: [
          {
            id: 'AAAAA',
            title: 'Test title 1',
            text: 'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ',
            author: 'Test author',
            created: 'this should be a date'
          },
          {
            id: 'BBBBB',
            title: 'Test title 2',
            text: 'short example',
            author: 'Test author',
            created: 'this should also be a date'
          }
        ]
      }
    }
  }
</script>

<style>
  .notes {
    display: grid;
  }
</style>
