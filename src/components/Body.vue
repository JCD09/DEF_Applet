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
              <b-th colspan="1">{{name}}</b-th>
              <b-th colspan="1">Score</b-th>
            </template>
          </b-tr>
          <b-tr v-for="(row,rowID) in rows" 
              v-bind:key="rowID"
              v-bind:value="row">
              <b-td>{{row['value']}}</b-td>
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
                    v-model.number = "row['alternatives'][name]"
                    @change="updateAlternative($event,row['value'],name)">
                  </b-input>
                </b-td>
                <b-td>{{row['weight']*getRating1(rowID,name)}}</b-td>
              </template>

          </b-tr>
        </b-table-simple>
      </b-col>
    <b-row>
  </b-container>

<!-- 
                    <b-tr
                        v-for="(value, name) in values" 
                        v-bind:key="name" 
                        v-bind:value="value">
                          <b-td >{{name}}:</b-td>
                          <b-td >{{value}}</b-td>
                    </b-tr> -->


  <!-- <b-th
                     v-for="(value, key) in alternatives" 
                     v-bind:key="key"
                     v-bind:value="value">
                      <b-th>{{key}}</b-th>
                      <b-th>rating</b-th>
                      <b-tr
                        v-for="(valueInner, keyInner) in value"
                        v-bind:key="keyInner"
                        v-bind:value="valueInner"> 
                        <b-td>{{valueInner}}</b-td>
                        <b-td>0</b-td>
                      <b-tr>
                </b-th> -->


  <b-button v-b-modal.addValue >Create New Value</b-button>
    <b-modal 
      ref="valueModal"
      id="addValue"
      title="Add Value to the Calculator">

      <p>Current Alternatives</p>
      <b-list-group>
        <b-list-group-item 
        v-for="(row, name) in rows" 
        v-bind:key="name" 
        v-bind:value="row"
        button
        @click="removeCurrentValue(name)">{{name}}</b-list-group-item>
      </b-list-group>


      <div>
        <p>New Value:</p>
        <b-form-input v-model="text" placeholder="Enter desired value/preferene"></b-form-input>
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
              @click="insertValue(text,weight)">Insert New Alternative</b-btn>
            <b-btn squared variant="secondary" @click="hideModal">Exit</b-btn>
      </div>

      
    </b-modal>
  <b-button v-b-modal.addAlternative >Create New Alternative</b-button>
  <b-modal id="addAlternative">
    <b-list-group-item 
        v-for="(alternative, name) in alternatives" 
        v-bind:key = "name"
        button
        @click="removeAlternative(name)">{{name}}
    </b-list-group-item>
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