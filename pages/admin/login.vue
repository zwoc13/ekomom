<template>
  <div class="login">
    <form class="login-form column is-4" @submit.prevent="handleLogin" v-if="!user">
      <div class="field">
        <div class="label">Email</div>
        <input 
          class="input" 
          :class="{ 'is-danger': error.length > 0 }"
          type="text" 
          v-model="email" 
          placeholder="example@domain.com" 
          autocomplete="new-password"
        />
      </div>
      <div class="field">
        <div class="label">Password</div>
        <input 
          class="input"
          :class="{ 'is-danger': error.length > 0 }"
          type="password"
          v-model="password"
          autocomplete="new-password"
        />
        <div v-if="error.length > 0" class="help is-danger">{{ error }}</div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Login</button>
        </div>
      </div>
    </form>
    <div class="login-form column is-4" v-else>
      <nuxt-link class="button button-primary" to="/admin/dashboard">Перейти в адмін панель</nuxt-link>
    </div>
  </div>  
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  layout: 'login_layout',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
    })
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    async handleLogin() {
      const { email, password } = this
      await this.login({ email, password })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: $pink;
  justify-content: center;
  align-items: center;
  &-form {
    background: white;
    padding: 15px;
    border: 1px solid $darker-pink;
  }
}
</style>