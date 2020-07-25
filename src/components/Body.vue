<template>
  <div id="body">
    <Table v-if="layout==='TABLE'"></Table>
    <Scroll v-if="layout==='SCROLL'"></Scroll>
    <!-- <button @click="switch_layout">Change Layout</button> -->
  </div>
</template>

<script>
import Scroll from './Layoyt/Scroll/Scroll.vue'
import Table from './Layoyt/Table/Table.vue'

let table = 'TABLE'; 
let scroll = 'SCROLL';
let empty = 'EMPTY'

export default {
  name: 'Body',
  components: {
    Scroll,
    Table
  },
  data() {
    return {
      layout:table
    }
  },
  methods:{
    switch_layout(){
      if(this.layout===scroll){this.layout=table}
      else{this.layout=scroll}
    }
  }
}

</script>

<style lang="scss">

#body {
  color: black;
}

</style>