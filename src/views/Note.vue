<template>
  <div class="note">
    <div class="note-header">{{ title }}</div>
    <div class="note-body">{{ text }}</div>
    <div class="note-footer">{{ author + ' ' + created }}</div>
  </div>
</template>

<script>
  export default {
    name: 'note',
    data: function () {
      return {
        // id: '',
        // title: ''
        // text: '',
        // files: null,
        // author: '',
        // created: ''
      }
    },
    props: ['id', 'title', 'text', 'author', 'created']
  }
</script>

<style scoped>
  .note {
    border: 1px solid black;
    border-radius: 3px;
    margin-top: 2rem;
  }
</style>
