<template>
  <div class="modal-mask">
      <div class="modal-container">
        <div class="modal-header-col">
          <div id="modal-header-text">
            Add New Alternative to The Table
          </div>
          <button id="x" class="col-modal-btn" @click="$emit('close')">
              &#10005
          </button>
        </div>
        <div class="modal-body">
          <div class="modal-input">
            <label>Enter New Alternative:</label>
            <input v-model="text" id="new-alternative">
          </div>
          <div class="current-alternatives">
            Current Alternatives:
            <div class="list-alternatives" v-for="(alternative, name) in alternatives" 
                  v-bind:key = "name"
                  button>
                  {{name}}
                  <i id="icon" class="fas fa-trash-alt" button @click="removeAlternative(name)" ></i>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button class="col-modal-btn" @click="insertAlternative(text)">
            ADD
          </button>
          <button class="col-modal-btn" @click="$emit('close')">
            EXIT
          </button>
        </div>
      </div>
  </div>
</template>
    
<script> 
  import { mapState } from 'vuex'

  export default {
    name: 'ColModal',
    data() {
      return {
        text:"",
      }
    },
    methods:{
      insertAlternative(name){
        this.$store.dispatch('insertAlternative', name)
        this.$forceUpdate()
        this.text=""
      },
      removeAlternative(name){
        this.$store.dispatch('removeAlternative', name)
        this.$forceUpdate()
      },
    },
    computed:{
      ...mapState(['alternatives'])
    }
  }
</script>
    
    
<style>
/* modal mask is the back background that turns on when modal is opened.  */
.modal-mask {
  position: fixed;
  z-index: auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 25%;
  height: 50%;
  background-color: #fff;

  display:flex;
  flex-direction: column;
}

.modal-body{
  height: 60%;
  color:black;
  background-color: white;

  display:flex;
}

.modal-input{
  width:50%;
  height:100%;
  margin-left: 3%;
}

.current-alternatives{
  width:50%;
  height:100%;
  margin-left: 3%;
  
}

.buttons {
  height:15%;

  display: flex; 
  flex-direction: row;
  justify-content: space-evenly;

  padding: 2%;
  background-color: #b00800;
}

.col-modal-btn {
  width: 70%;
  height: 25%;
  background-color:#b00800;
  border: none;
  padding: 15px 32px;
  text-decoration: none;
  color: white;
  font-family: "HelveticaNeue-Bold";


}



.modal-header-col{
  height: 15%;
  background-color:#b00800 ;
  color:white;

  display: flex;
  padding: 2%;
}

.list-alternatives{
  display: flex; 
  flex-direction: row;

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

#x{
  height: 100%;
  width:  1%;

  display: flex;
  align-items: center;
  justify-content: center;

}

#new-alternative{
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