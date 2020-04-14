<template>
  <div class="auth-page">
    <h1 class="auth-header">Sign up</h1>
    <p class="auth-subheader">
      <router-link class="link" to="/login">
        Have an account?
      </router-link>
    </p>
    <form class="auth-form">
      <div class="input-group">
        <input v-model="username" class="auth-input" type="text" placeholder="Username" required>
      </div>
      <div class="input-group">
        <input v-model="email" class="auth-input" type="text" placeholder="Email" required>
      </div>
      <div class="input-group">
        <input v-model="repeatEmail" class="auth-input" type="text" placeholder="Repeat email" required>
      </div>
      <div class="input-group">
        <input v-model="password" class="auth-input" type="password" placeholder="Password" required>
      </div>
      <div class="input-group">
        <input v-model="repeatPassword" class="auth-input" type="password" placeholder="Repeat password" required>
      </div>
      <!--        TODO: Positioning-->
      <div class="auth-footer">
        <button class="auth-submit-btn">Sign up</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data: function () {
      return {
        username: '',
        email: '',
        repeatEmail: '',
        password: '',
        repeatPassword: ''
      }
    }
  }
</script>

<style scoped>

</style>
