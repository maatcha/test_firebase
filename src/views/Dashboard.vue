<template>
  <div>
    <p v-if="(loggedIn = true)">Dashboard</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false
    }
  },
  methods: {
    logIn() {
      return 'something'
    }
  }
}
</script>

<style></style>
