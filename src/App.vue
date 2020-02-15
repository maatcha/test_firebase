<template>
  <div id="app">
    <Navigation v-if="currentUser"></Navigation>
    <router-view />
  </div>
</template>

<script>
import Navigation from '@/views/Navigation.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Navigation
  },
  computed: mapState(['currentUser'])
}
</script>

<style></style>
