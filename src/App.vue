<template>
  <div id="app">
    <nav class="navbar">
      <ul class="navbar-nav">

        <li class="logo">
          <router-link to="/notes" class="nav-link">
            <span class="link-text logo-text">Memo Lite</span>
            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="angle-double-right" role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                 class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x">
              <path
                fill="currentColor"
                d="M312 320h136V56c0-13.3-10.7-24-24-24H24C10.7 32 0 42.7 0 56v400c0 13.3 10.7 24 24 24h264V344c0-13.2 10.8-24 24-24zm129 55l-98 98c-4.5 4.5-10.6 7-17 7h-6V352h128v6.1c0 6.3-2.5 12.4-7 16.9z"
                class="fa-primary">
              </path>
            </svg>
          </router-link>
        </li> <!-- Logo -->

        <li v-if="isAuthenticated" class="nav-item">
          <router-link to="/notes" class="nav-link">
            <!--  v-if="this.$store.state.user.photoURL == null" -->
            <svg aria-hidden="true" focusable="false"  data-icon="user" role="img"
                 class="svg-inline--fa fa-user fa-w-14 fa-3x" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                class="fa-primary">
              </path>
            </svg>
            <!--
            <img v-else :src="this.$store.state.user.photoURL" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" class="user-profile-pic"/>
            -->
            <span class="link-text">{{ this.$store.state.user.name }}</span>
          </router-link>
        </li>  <!-- User icon -->

        <li v-if="!isAuthenticated" class="nav-item">
          <router-link to="/login" class="nav-link">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-in-alt"
                 class="svg-inline--fa fa-sign-in-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
                class="fa-primary">
              </path>
            </svg>
            <span class="link-text">Sign&nbsp;in</span>
          </router-link>
        </li> <!-- Sign in -->

        <li v-if="!isAuthenticated" class="nav-item">
          <router-link to="/register" class="nav-link">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-plus" role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                 class="svg-inline--fa fa-user-plus fa-w-20 fa-3x">
              <path
                fill="currentColor"
                d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                class="fa-primary">
              </path>
            </svg>
            <span class="link-text">Create an account</span>
          </router-link>
        </li> <!-- Create an account -->

        <li v-if="isAuthenticated" class="nav-item">
          <router-link to="/notes" class="nav-link">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-book fa-w-14 fa-3x">
              <path
                fill="currentColor"
                d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"
                class="fa-primary">
              </path>
            </svg>
            <span class="link-text">Your notes</span>
          </router-link>
        </li> <!-- Your notes -->

        <li v-if="isAuthenticated" class="nav-item">
          <router-link to="/create" class="nav-link">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-plus fa-w-14 fa-2x">
              <path
                fill="currentColor"
                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                class="fa-primary note-icon">
              </path>
            </svg>
            <span class="link-text">Add note</span>
          </router-link>
        </li> <!-- Add note -->

        <li v-if="isAuthenticated" class="nav-item">
          <router-link to="/calendar" class="nav-link">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-calendar-alt fa-w-14 fa-3x">
              <path
                fill="currentColor"
                d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                class="fa-primary">
              </path>
            </svg>
            <span class="link-text">Calendar</span>
          </router-link>
        </li> <!-- Calendar -->

        <li v-if="isAuthenticated" class="nav-item" v-on:click="signOut">
          <router-link to="/login" class="nav-link sign-out">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt"
                 class="svg-inline--fa fa-sign-out-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                class="fa-primary">
              </path>
            </svg>
            <span class="link-text">Sign&nbsp;out</span>
          </router-link>
        </li> <!-- Sign out -->
      </ul>
    </nav>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>

export default {
  methods: {
    signOut: function () {
      this.$store.dispatch('userSignOut')
    }
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.getters.isAuthenticated
    }
  }
  // props: ['currUser']
  // data: function () {
  //   return {
  //     currUser: null
  //   }
  // },
  // firebase: function () {
  //   return {
  //     currUser: db.doc(`users/${firebase.auth().currentUser.uid}`)
  //   }
  // }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  :root {
    font-size: 16px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    --text-primary: #b6b6b6;
    --text-secondary: #ececec;
    --bg-primary: #212831;
    --bg-secondary: #1b1b1b;
    --transition-speed: 600ms;
    --accent-color: #3da779
  }

  body {
    padding: 0;
    margin: 0;
  }

  main {
    margin-left: 5rem;
    padding: 0;
  }

  /*  Our navbar  */
  .navbar {
    position: fixed;
    background-color: var(--bg-primary);
    transition: width 600ms ease;
    overflow: hidden;
    z-index: 500;
  }

  .navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .nav-item {
    width: 100%;
  }

  .nav-link {
    display: flex;
    align-items: center;
    height: 5rem;
    color: var(--text-primary);
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: var(--transition-speed);
  }

  .nav-link:hover {
    filter: grayscale(0%) opacity(1);
    background: var(--bg-secondary);
    color: var(--text-secondary);
  }

  .link-text {
    display: none;
    margin-left: 1rem;
  }

  .nav-link svg {
    width: 2rem;
    min-width: 2rem;
    margin: 0 1.5rem;
  }

  .fa-primary {
    color: var(--accent-color);
    transition: var(--transition-speed);
  }

  .fa-secondary {
    color: #fff;
    transition: var(--transition-speed);
  }

  .logo {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-align: center;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    font-size: 1.5rem;
    letter-spacing: 0.2ch;
    width: 100%;
  }

  .logo svg {
    transform: rotate(0deg);
    transition: var(--transition-speed);
  }

  .logo-text {
    display: inline;
    position: absolute;
    left: -999px;
    transition: var(--transition-speed);
  }

  .user-profile-pic {
    margin: 1rem;
    width: 100%;
  }

  .navbar:hover .logo svg {
    transform: rotate(-225deg);
  }

  /* Small screens */
  @media only screen and (max-width: 600px) {
    .navbar {
      bottom: 0;
      width: 100vw;
      height: 5rem;
    }

    .logo {
      display: none;
    }

    .navbar-nav {
      flex-direction: row;
    }

    .nav-link {
      justify-content: center;
    }

    main {
      margin: 0;
    }
  }

  /* Large screens */
  @media only screen and (min-width: 600px) {
    .navbar {
      top: 0;
      width: 5rem;
      height: 100vh;
    }

    .navbar:hover {
      width: 16rem;
    }

    .navbar:hover .link-text {
      display: inline;
      font-size: 1rem;
    }

    .navbar:hover .logo svg {
      margin-left: 11rem;
    }

    .navbar:hover .logo-text {
      left: 0px;
    }
  }

  /*  Default navbar  */
  /*#nav {*/
  /*  padding: 30px;*/
  /*}*/

  /*#nav a {*/
  /*  font-weight: bold;*/
  /*  color: #2c3e50;*/
  /*}*/

  /*#nav a.router-link-exact-active {*/
  /*  color: #42b983;*/
  /*}*/

  button {
    background-color: var(--accent-color);
    color: #fff;
    border-radius: 6px;
    border: 1px solid lightgrey;
    transition: ease-in-out 200ms;
    cursor: pointer;
  }

  button:hover, button:focus {
    filter: brightness(110%);
  }

  input:focus {
    outline-color: var(--accent-color);
  }

  input {
    font-font: inherit;
  }

  .top-bar {
     height: 80px;
     background-color: #fcfcfc;
     position: fixed;
     width: 100%;
     top: 0;
    z-index: 6;
   }

  .page-wrapper {
    margin: 0 7rem;
    font-size: inherit;
  }

  .top-header {
    float: left;
    z-index: 7;
  }

  .top-hr {
    background-color: var(--accent-color);
    position: fixed;
    top: 78px;
    left: 0;
    padding: 0;
    margin: 0;
    height: 2px;
    width: 100%;
    z-index: 7;
  }

  .link {
    color: var(--accent-color);
    text-decoration: none;
    cursor: pointer;
  }

  textarea {
    resize: none;
  }

  .link:hover, .link:focus {
    text-decoration: underline;
  }

  /*      AUTH PAGES (LOGIN, REGISTER)      */
  .auth-page {
    margin-top: 7%;
    font-size: 1rem;
    line-height: 1.5;
    color: #373a3c;
    box-sizing: border-box;
    display: grid;
    margin-left: 30%;
    margin-right: 30%;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .auth-header {
    box-sizing: inherit;
    color: inherit;
    line-height: 1.1;
    font-weight: 500;
    margin: 0 0 .5rem;
    font-size: 2.5rem;
    text-align: center !important;
  }

  .auth-subheader {
    padding-bottom: 1.25rem;
    font-size: 1rem;
    line-height: 1.5;
    margin-top: .2rem;
    text-align: center !important;
    box-sizing: inherit;
    background-color: transparent;
  }

  .input-group {
    min-width: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    margin-bottom: 1.5rem;
  }

  ul.auth-errors {
    color: red;
    text-align: left;
  }

  .auth-forgot {
    line-height: 1.5;
    font-size: 1.25rem;
    font-weight: 400;
    float: left !important;
  }

  .auth-submit-btn {
    padding: .7rem 2rem;
    font-size: 1.4rem;
    font-weight: 500;
    float: right !important;
  }

  .auth-input {
    box-sizing: inherit;
    margin: 0;
    min-width: 0;
    border: 1px solid rgba(0, 0, 0, .15);
    background-clip: padding-box;
    background-color: #fff;
    color: #55595c;
    line-height: 1.5;
    width: 100%;
    display: block;
    border-radius: .3rem;
    font-size: 1.25rem;
    padding: .75rem 1.5rem;
  }
</style>
