<template>
<div class="panel">
    <button class="panel-btn" @click="showRowModal">ADD ROW</button>
    <button class="panel-btn" @click="showColModal">ADD COLUMN</button>
    <button disabled class="panel-btn">RESET</button>
    <ColModal v-show="colModalOpen" @close="closeColModal"></ColModal>
    <RowModal v-show="rowModalOpen" @close="closeRowModal"></RowModal>
</div>
</template>


<script>
import ColModal from './modal/ColModal.vue'
import RowModal from './modal/RowModal.vue'

export default {
  name: 'Panel',
  components : {
    ColModal,
    RowModal
  },
  data(){
    return {
      colModalOpen : false,
      rowModalOpen : false,
    }
  },
  methods:{
    showRowModal(){
      this.rowModalOpen=true;
    },
    closeRowModal(){
      this.rowModalOpen=false;
      this.$forceUpdate()
    },
    showColModal(){
      this.colModalOpen=true;
    },
    closeColModal(){
      this.colModalOpen=false;
      this.$forceUpdate()
    }
  } 
}

</script>

<style>
.panel {
    /* border: solid 1px black; */
    height: 100%;
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.panel-btn {
  width: 70%;
  height: 25%;
  background-color:#b00800;
  border: none;
  padding: 15px 32px;
  text-decoration: none;
  color: white;
  font-family: "HelveticaNeue-Bold";
}

.panel-btn[disabled=disabled]{
  background-color:grey
}
</style>