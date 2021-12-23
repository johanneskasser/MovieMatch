<template>
  <div class="vue-template">
    <form @submit.prevent="handleSubmit">
      <h3>Login</h3>

      <div class="form-group">
        <label>E-Mail Address</label>
        <input type="email" class="form-control form-control-lg" v-model='email' placeholder="E-Mail Address"/>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" v-model='password' placeholder="Password"/>
      </div>


      <button type="submit" class="btn btn-dark btn-lg btn-block button_alignment">Login</button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/">Forgot password ?</router-link>
      </p>
    </form>

  </div>

</template>

<script>
import axios from "axios";
import md_icon from 'vue-material-design-icons/Menu.vue'

export default {
  name: "Login",
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      const response = await axios({
        method: 'post',
        url: 'login',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        data: {
          email: this.email,
          password: this.password
        }
      })
      await this.$store.dispatch('user', response.data.user)
      console.log(response)
      //localStorage.setItem('token', response.data.token)
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>