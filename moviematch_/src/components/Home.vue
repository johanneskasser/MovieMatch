<template>
  <h3 v-if="user"> Hi, {{user.username}} </h3>
  <h3 v-else>You are not logged in!</h3>
</template>

<script>
import {mapGetters} from "vuex";

  export default {
    name: "Home",
    //props: ['user']
    computed: {
      ...mapGetters({
        user: 'user'
      })
    }
  }

</script>