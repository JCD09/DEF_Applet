<template>

<div class="body">
  <b-container fluid>
    <b-row>
      <b-col>
        <b-table-simple responsive small fixed stripped bordered outlined>
          <b-tr>
            <b-th colspan="1">Value</b-th>
            <b-th colspan="1">Weight (%)</b-th>
            <template v-for="(alternative, name) in alternatives">
              <b-th colspan="1"><center>{{name}}</center></b-th>
              <b-th colspan="1"><center>Score</center></b-th>
            </template>
          </b-tr>
          <b-tr v-for="(row,rowID) in rows" 
              v-bind:key="rowID"
              v-bind:value="row">
              <b-td><center>{{row['value']}}</center></b-td>
              <b-td>
                <b-input 
                type=number min=0 v-bind:max="maxPerc+row['weight']"
                v-model.number = "row['weight']"
                @change="updateValue($event,row['value'])">
                </b-input>
              </b-td>
              <template v-for="(alternative, name) in row['alternatives']">
                <b-td>
                  <b-input 
                    type=number min=0 v-bind:max=1 step="0.1"
                    v-model.number = "row['alternatives'][name]['weight']"
                    @change="updateAlternative($event,row['value'],name)">
                  </b-input>
                </b-td>
                <b-td>
                  <center>{{Number(row['alternatives'][name]['product']).toFixed(2)}}</center>
                </b-td>
              </template>
          </b-tr>
          <b-tfoot>
            <b-tr>
              <b-td colspan="2"><b><center>Totals: Rating*Weight</center></b></b-td>
              <b-td colspan="2" v-for="(alternative, name) in alternatives" v-bind:key="name">
                <b><center>{{
                  Number(Object.values(rows).map(row => row.alternatives).map(line=>line[name].product).
                  reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)}}</center></b>
            </b-td>
          <b-tfoot>
        </b-table-simple>
      </b-col>
    <b-row>
  </b-container>

  <b-button v-b-modal.addValue >Create New Value</b-button>
    <b-modal 
      ref="valueModal"
      id="addValue"
      title="Add Value to the Calculator">

      <p>Current Alternatives</p>
      <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center"
        v-for="(row, name) in rows" 
        v-bind:key="name" 
        v-bind:value="row"
        button
        @click="removeCurrentValue(name)">{{name}}<b-icon icon="trash" scale="2" button @click="removeAlternative(name)"></b-icon></b-list-group-item>
      </b-list-group>


      <div>
        <p></p>
        <p>New Value:</p>
        <p></p>
        <b-form-input v-model="text" placeholder="Enter desired value/preferene"></b-form-input>
         <p></p>
        <p>Weight (%). Enter number between 0 and {{maxPerc}}</p>
        <p></p>
        <b-form-input 
        v-model="weight"
        placeholder="Enter Desired Weight"
        trim
        ></b-form-input>
      </div>
      
      <div slot="modal-footer">
            <b-btn squared variant="secondary" 
              :disabled=!validatePercentage
              placeholder="Enter desired alternative"
              @click="insertValue(text,weight)">Insert New Value/Preference</b-btn>
            <b-btn squared variant="secondary" @click="hideModal">Exit</b-btn>
      </div>

      
    </b-modal>
  <b-button v-b-modal.addAlternative >Create New Alternative</b-button>
  <b-modal id="addAlternative">
    <p>Current Alternatives</p>
    <p></p>
    <b-list-group-item class="d-flex justify-content-between align-items-center"
        v-for="(alternative, name) in alternatives" 
        v-bind:key = "name"
        ><b>{{name}}</b><b-icon icon="trash" scale="2" button @click="removeAlternative(name)"></b-icon>
    </b-list-group-item>
    <p></p>
    <p>Enter Alternative</p>
    <b-form-input v-model="text" placeholder="Enter new Alternative"></b-form-input>
    
    <div slot="modal-footer">
        <b-btn squared variant="secondary" 
          @click="insertAlternative(text)">Insert New Alternative</b-btn>
        <b-btn squared variant="secondary" @click="hideModal">Exit</b-btn>
    </div>
  </b-modal>
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
        text: ""
      }
   },

  methods:{
    hideModal() {
        this.$refs['valueModal'].hide()
      },
    // Had to add force update because of how vuejs handles reactivity. 
    insertValue(name, value){
      let weight = parseInt(value)
      this.$store.dispatch('insertValue', {name, weight})
      this.$forceUpdate()
    },

    removeCurrentValue(name){
      this.$store.dispatch('removeSelecedValue', name)
      this.$forceUpdate()
    },

    insertAlternative(name){
      this.$store.dispatch('insertAlternative', name)
      this.$forceUpdate()
    },

    removeAlternative(name){
      this.$store.dispatch('removeAlternative', name)
      this.$forceUpdate()
    },

    updateValue(newWeight, value){
      this.$store.dispatch('updateValue',{newWeight, value})
      this.$forceUpdate()
      // dispatch update signal
    },

    updateAlternative(newRating, row, col){
      //console.log(newRating+" "+value+" "+alternative)
      this.$store.dispatch('updateAlternative', {newRating, row, col})
      this.$forceUpdate()

    }
  },

  computed:{
    ...mapState(['rows','alternatives','maxPerc', 'getRating']),

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