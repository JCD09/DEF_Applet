<template>
<div id="app">
  <Header></Header>
  <Body></Body>
</div>
</template>
<script>

import Body from './components/Body.vue'
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Header,
    Body
  }
}

</script>

<style lang="css">
</style>