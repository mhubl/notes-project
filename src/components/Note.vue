<template>
  <div class="note" v-on:click="openViewer">
    <div class="note-header"><h4>{{ title }}</h4></div>
    <hr>
    <div class="note-body">{{ text }}</div>
    <div class="note-footer">{{ created.toDate().toUTCString() }}</div>
  </div>
</template>

<script>
export default {
  name: 'note',
  methods: {
    openViewer: function () {
      this.$router.push(`/edit/${this.id}`)
    }
  },
  props: ['id', 'title', 'text', 'author', 'created']
}
</script>

<style scoped>
  .note {
    margin: 1vh 1vw;
    border-radius: 1vmin;
    padding: 4%;
    border: 1px solid #bbbbbb;
    text-align: justify;
    transition: ease-in-out 150ms;
    z-index: 5;
  }

  .note:hover {
    /*box-shadow: 5px 5px 15px #eeeeee;*/
    cursor: pointer;
    background-color: #e1fde5;
  }

  .note-header {
    float: left;
    font-size: 3vh;
    width: 93%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .note-body {
    font-size: 2vh;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    margin: 1.25rem auto;
  }

  .note-footer {
    padding: 0px 15px;
  }

  hr {
    clear: both;
    border: 2px solid var(--accent-color);
    border-radius: 2px;
    color: var(--accent-color);
  }

  #pin {
    height: 3vh;
    width: 3vh;
    float: right;
    z-index: 100;
  }
  h4 {
    margin-bottom: .5rem;
    margin-top: .5rem;
  }
</style>
