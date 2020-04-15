<template>
  <div class="note">
    <div class="note-header"><h4>{{ title }}</h4></div>
    <hr>
    <div class="note-body">{{ text }}</div>
    <div class="note-footer">{{ created.toDate().toUTCString() }}</div>
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
    margin: 1vh 1vw;
    background-color: #fff;
    border-radius: 1vmin;
    padding: 4%;
    box-shadow: 5px 5px 15px #888888;
    text-align: justify;
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
    border: 2px solid var(--bg-primary);
    border-radius: 2px;
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
