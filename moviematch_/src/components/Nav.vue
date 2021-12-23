<template>

  <div id="app">
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand">Home</router-link>
        <a href="#" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto" v-if="!user">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Sign Up</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto" v-if="user">
            <li class="nav-item">
              <router-link @click.native="logout" to="/login">Logout</router-link>
            </li>
          </ul>
        </a>
      </div>
    </nav>

  </div>

</template>

<script>
    import axios from "axios";
    import {mapGetters} from 'vuex'

    export default {
      name: 'Nav',
      //props: ['user'],
      computed: {
        ...mapGetters(['user']),
      },
      methods: {
        async logout() {
          await this.$store.dispatch('user', null)
          await axios({
            method: 'post',
            url: 'logout',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
          })
        }
      }
    }

</script>