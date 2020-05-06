<template>
  <div class="page-wrapper">
    <div class="top-bar">
      <h1 class="top-header">Your notes</h1>
    </div>
    <hr class="top-hr">
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

<script>
import note from '../components/Note.vue'

export default {
  name: 'Notes',
  components: { note },
  data () {
    return {
      notes: this.$store.state.notes,
      filters: []
    }
  }
}
</script>

<style scoped>
  .notes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40%, 45%));
    left: 75px;
    top: 100px;
    position: absolute;
    width: 100%;
    padding: 50px;
  }
</style>
