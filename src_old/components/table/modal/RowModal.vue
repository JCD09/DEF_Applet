<template>
  <div class="modal-mask-row">
    <div class="modal-container-row">
        <div id="modal-row-header">
          Add New Value to The Table
        </div>
        <button id="x-row" class="row-modal-btn" @click="$emit('close')">
          &#10005
        </button>
        <div id="modal-input-row">
          New Value:
          <input id="test" v-model="text">
          <label>Value: {{this.weight}}</label>
          <input id="test" type="range" min="1" :max="maxPerc" v-model="weight" class="slider" id="myRange" >
        </div> 
        <div id="values">
          <label>Values</label>
          <div class="list-alternatives" 
              v-for="(row, name) in rows" 
              v-bind:key="name" 
              v-bind:value="row">
                {{name}}
                <i id="icon" class="fas fa-trash-alt" button @click="removeCurrentValue(name)" ></i>
          </div>
        </div> 
        <button id="modal-row-add" class="row-modal-btn" :disabled=!validatePercentage @click="insertValue(text,weight)">
            ADD
        </button>
        <button id="modal-row-exit" class="row-modal-btn" @click="$emit('close')">
            EXIT
        </button>
      </div>
  </div>
</template>
    
<script> 
  import { mapState } from 'vuex'

  export default {
    name: 'RowModal',
    data() {
      return {
        weight: 0,
        text: "",
      }
    },
    methods:{
      insertValue(name, value){
        console.log(name+" "+value)
        let weight = parseInt(value)
        this.$store.dispatch('insertValue', {name, weight})
        this.text=""
        this.$forceUpdate()
      },
      removeCurrentValue(name){
        this.$store.dispatch('removeSelecedValue', name)
        this.$forceUpdate()
      },
      pdateValue(newWeight, value){
        this.$store.dispatch('updateValue',{newWeight, value})
        this.$forceUpdate()
        // dispatch update signal
      },
    },
    computed:{
      ...mapState(['rows','maxPerc', 'getRating']),

    getRating1(){
      return (row,col) => this.$store.getters.getRating(row,col)
    },
    validatePercentage(){
      var myRe = new RegExp(/(^[1-9][0-9]?$)|^(100)$/, 'g');
      if (myRe.test(this.weight) == true){
        if(parseInt(this.weight)<= this.maxPerc){
          return true
        }
        else {
          return false
        }
      }
    },
    }
  }
</script>
    
    
<style>
/* modal mask is the back background that turns on when modal is opened.  */
.modal-mask-row {
  position: fixed;
  z-index: auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;

   /*center modal container */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container-row{
  width: 25vw;
  height: 50vh;
  background-color: #fff;

  display: grid;
  grid-template-columns: 6fr 4fr 2fr;
  grid-template-rows: 1fr 8fr 1fr;
  grid-template-areas:
  "header header x-close"
  "input-row values values"
  "button-add button-exit button-exit";
}

#modal-row-header{
  grid-area: header;
  background-color:#b00800;
  
  color:white;

  /* border: 1px solid black; */

  display: flex;
  justify-content: center;
  align-items: center;

}

#x-row{
  grid-area: x-close;
  background-color:#b00800;
  color:white;

  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;

  width:100%;
  height:100%;
}

#modal-input-row{
  grid-area: input-row;

  display:flex;
  flex-direction: column;

  /* border: 1px solid black; */

  justify-items: center;
  padding:7%;

}


#values{
  grid-area: values;

  display:flex;
  flex-direction: column;

  /* border: 1px solid black; */

  justify-items: center;
  padding: 7%;
}

#modal-row-add {
  grid-area: button-add;
  width:100%;
  height:100%;
}

#modal-row-add:disabled,
#modal-row-add[disabled=disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

#modal-row-exit{
  grid-area: button-exit;
  width:100%;
  height:100%;
}


.buttons {
  height:15%;

  display: flex; 
  flex-direction: row;
  justify-content: space-evenly;

  padding: 2%;
  background-color: #b00800;
}

.row-modal-btn {
  width: 70%;
  height: 25%;
  background-color:#b00800;
  border: none;
  padding: 15px 32px;
  text-decoration: none;
  color: white;
  font-family: "HelveticaNeue-Bold";

  display:flex;
  justify-content: center;
  align-items: center;
}

.modal-header-col{
  height: 15%;
  background-color:#b00800 ;
  color:white;

  display: flex;
  padding: 2%;
}

.list-alternatives{  

  margin-left: 3%;
  width: 80%;

  
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid black; */
  
}


#icon{
  float:right;
  text-align: center;
  color:#b00800;
}

#modal-header-text{
  height: 100%;
  width:  99%;

  display: flex;
  align-items: center;
  justify-content: left;

  margin-left: 3%;
  
}

#new-alternative{
  width:80%;
}

#test{
  width:80%;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

/* .modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
} */
</style>
<style scoped>


</style>