<template>
  <div id="app">
    <Nav />

    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>

  </div>
</template>

<script>
  import Nav from './components/Nav.vue';
  import axios from "axios";
  const regeneratorRuntime = require("regenerator-runtime");

  export default {
      name: 'App',
      components: {
        Nav,
      },/*
      data() {
        return {
          user: null
        }
      },*/
      async beforeUpdate() {
        try {
          const response = await axios.get("user")
          //console.log("Response in App: ", response)
          await this.$store.dispatch('user', response.data)
        } catch (e) {
          console.log("Error ", e)
          await this.$store.dispatch('user', '')
        }
      }
  }
</script>

<style>

</style>
