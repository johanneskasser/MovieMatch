<template>
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand float-left"><h1 id="movie">Movie<span id="match">Match</span></h1></router-link>
        <ul class="nav navbar-nav flex-row float-right" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="btn btn-outline-primary navbar_button">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="btn btn-outline-primary">Sign Up</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="user">
          <li class="nav-item">
            <router-link @click.native="logout" to="/login" class="btn btn-outline-primary">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>


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