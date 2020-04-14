<template>
  <div class="auth-page">
    <h1 class="auth-header">Sign in</h1>
    <p class="auth-subheader">
      <router-link class="link" to="/register">
        Need an account?
      </router-link>
    </p>
    <form @submit.prevent="signInEmail" class="auth-form">
      <div class="input-group">
        <input v-model="email" class="auth-input" type="text" placeholder="Email" label="Email" required>
      </div>
      <div class="input-group">
        <input v-model="password" class="auth-input" type="password" placeholder="Password" label="Password" required>
      </div>
      <!--        TODO: Position and resize -->
      <div class="input-group">
        <div class="auth-provider">
          <img src="../assets/google-brands.svg" class="auth-provider-icon">
          Sign in with Google
        </div>
      </div>
      <!--        TODO: Positioning-->
      <div class="auth-footer">
        <router-link class="link auth-forgot" to="/register">
          Forgot your password?
        </router-link>
        <button class="auth-submit-btn" type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signInEmail: function () {
      this.$store.dispatch('userSignIn', {email: this.email, password: this.password})
    }
  }
}
</script>

<style scoped>
  .auth-provider {
    width: 100%;
    background-color: #f2f2f2;
    border: 1px solid lightgrey;
    border-radius: 5px;
    position: inherit;
    line-height: 4.1rem;
    font-weight: 500;
    font-size: 1.5rem;
  }

  .auth-provider-icon {
    width: 10%;
    background-color: rgba(0, 0, 0, 0);
    float: left !important;
    margin: .6rem;
  }
</style>
