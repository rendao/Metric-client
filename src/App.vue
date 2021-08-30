<template>
  <div id="app">
    <notifications position="bottom right" />
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
  import Navbar from '@/components/navbar';
  export default {
    components: {
      Navbar
    },
  }
</script>

<style lang="scss">
#app {
  width: 100%;
  font-family: PT Sans,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
