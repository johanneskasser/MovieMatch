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
  const regeneratorRuntime = require("regenerator-runtime");


  export default {
      name: 'App',
      components: {
        Nav,
      }
  }
</script>

<style>

</style>
