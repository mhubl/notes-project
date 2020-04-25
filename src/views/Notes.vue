<template>
  <div class="notes-page" >
    <div class="top-bar">
      <h1 class="header-title">Your notes</h1>
    </div>
    <div class="notes">
      <note
        v-for="note in notes"
        v-bind:key="note.id"
        v-bind:id="note.id"
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
import 'firebase/auth'

export default {
  name: 'Notes',
  components: { note },
  data () {
    return {
      notes: this.$store.state.notes,
      filters: []
    }
  },
  methods: {
    filterNotes: function () {
      for (const filter in this.filters) {
        this.applyFilter(filter)
      }
    },
    applyFilter: function (filter) { // TODO: Placeholder for now
      return false
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
    width: 100%;
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
