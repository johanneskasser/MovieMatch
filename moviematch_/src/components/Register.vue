<template>
  <form @submit.prevent="handleSubmit">
    <h3>Register</h3>

    <div class="form-group">
      <label>Username</label>
      <input type="text" class="form-control" v-model="username" placeholder="Username"/>
    </div>

    <div class="form-group">
      <label>E-Mail</label>
      <input type="email" class="form-control" v-model="email" placeholder="E-Mail"/>
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password" placeholder="Password"/>
    </div>

    <button class="btn btn-primary btn-block">Create</button>
  </form>

</template>

<script>
    import axios from 'axios'
    export default {
      name: "Register",
      data() {
        return {
          username: '',
          email: '',
          password: '',
        }
      },
      methods: {
        async handleSubmit(){
          const response = await axios({
            method: 'post',
            url: 'register',
            headers: {'Content-Type': 'application/json'},
            data: {
              username: this.username,
              email: this.email,
              password: this.password
            }
          })
          console.log(response)
          await this.$router.push('/login')
        }
      }
    }
</script>

<style scoped>

</style>