<template>

<div class="body">
  <b-container>
    <b-row>
        <b-container>
          <b-row>
            <b-col>
              <b-table-simple bordered outlined>
                 <b-tr>
                  <b-th colspan="2">Values</b-th>
                  <b-th>Alternatives</b-th>
                </b-tr>
                <b-tr>
                  <b-th colspan="1">Value</b-th>
                  <b-th colspan="1">Weight (%)</b-th>
                </b-tr>
              <b-tr
                  v-for="(value, name) in values" 
                  v-bind:key="name" 
                  v-bind:value="value">
              <b-th colspan="1">
                {{name}}:
              </b-th>
              <b-th colspan="1">
                {{value}}
              </b-th>
              <b-tr>
               </b-table-simple>
            <b-col>
          </b-row>
        </b-container>
    <b-row>
  </b-container>




  <b-button v-b-modal.addValue >Create New Value</b-button>
    <b-modal 
      ref="valueModal"
      id="addValue"
      title="Add Value to the Calculator">

      <p>Current Alternatives</p>
      <b-list-group>
        <b-list-group-item 
        v-for="(value, name) in values" 
        v-bind:key="name" 
        v-bind:value="value"
        button
        @click="removeCurrentAlternative(name)">{{name}}</b-list-group-item>
      </b-list-group>


      <div>
        <p>New Value:</p>
        <b-form-input v-model="text" placeholder="Enter desired alternative"></b-form-input>
        <p>Weight (%). Enter number between 0 and {{maxPerc}}</p>
        <b-form-input 
        v-model="weight"
        placeholder="Enter Desired Weight"
        trim
        ></b-form-input>
      </div>
      
      <div slot="modal-footer">
            <b-btn squared variant="secondary" 
              :disabled=!validatePercentage
              @click="insertNewAlternative(text,weight)">Insert New Alternative</b-btn>
            <b-btn squared variant="secondary" @click="hideModal">Exit</b-btn>
      </div>

      
    </b-modal>
  <b-button>Create New Alternative</b-button>
</div>
</template>


<script>

import Value from './Value.vue'
import Alternative from './Alternative.vue'
import { mapState } from 'vuex'

export default {
  name: 'Body',
   data() {
      return {
        show: false,
        weight: 0,
        text: "",
      }
   },

  methods:{
    hideModal() {
        this.$refs['valueModal'].hide()
      },
    // Had to add force update because of how vuejs handles reactivity. 
    insertNewAlternative(name, value){
      let weight = parseInt(value)
      this.$store.dispatch('insertNewAlternative', {name, weight})
      this.$forceUpdate()
    },

    removeCurrentAlternative(name){
      this.$store.dispatch('removeSelecedAlternative', name)
      this.$forceUpdate()
    },
  },

  computed:{
    ...mapState(['values','maxPerc']),

    validatePercentage(){
      var myRe = new RegExp(/(^[1-9][0-9]?$)|^(100)$/, 'g');
      console.log(this.weight)
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