<template>
  <div id="app">
    <Body></Body>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Body,
    Footer
  }
}
</script>

<style lang="scss">
@import './src/index.scss';

#app {
  //this is where we use the variable
  color: $primary;
}
</style>