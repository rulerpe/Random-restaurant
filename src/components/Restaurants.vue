<template>
  <v-container grid-list-md text-xs-center>
  </v-container>
</template>

<script>
export default {
  name: 'Restaurants',
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    restaurantResult () {
      return this.$store.getters.searchResults
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
