<template>
<div class="table">
    <th id="temp" colspan="1">Value</th>
    <th id="temp" colspan="1">Weight (%)</th>
    <template v-for="(alternative, name) in alternatives">
        <th id="temp" colspan="1">Rating: {{name}}</th>
        <th id="temp" colspan="1">Score</th>
    </template>
    <tr v-for="(row,rowID) in rows" 
              v-bind:key="rowID"
              v-bind:value="row">
              <td>{{row['value']}}</td>
              <td>
                  <WeightBox :maxValue="maxPerc+row['weight']" :field="row['weight']" :valueID="row['value']"></WeightBox>
                <!-- <div id="value-field">
                    <button class="minus" @click="incNumber">-</button>
                    <input 
                        type=number min=0 v-bind:max="maxPerc+row['weight']"
                        v-model.number = "row['weight']"
                        @change="updateValue($event,row['value'])">
                    <button class="plus" @click="decNumber">+</button>
                </div> -->
              </td>
              <template v-for="(alternative, name) in row['alternatives']">
                <td>
                    <RatingBox :rating="row['alternatives'][name]['weight']" :valueID="row['value']" :alternativeID="name"></RatingBox>
                </td>
                <td>
                  {{Number(row['alternatives'][name]['product']).toFixed(2)}}
                </td>
              </template>
    </tr>
    <tfoot>
            <tr>
              <td id="total-rating1" colspan="2"><b><center>Totals: Rating &#10005 Weight</center></b></b-td>
              <td id="total-rating" colspan="2" v-for="(alternative, name) in alternatives" v-bind:key="name">
                <b><center>{{
                  Number(Object.values(rows).map(row => row.alternatives).map(line=>line[name].product).
                  reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)}}</center></b>
            </td>
          <tfoot>
</div>
</template>


<script>
import { mapState } from 'vuex'
import WeightBox from './tableComponents/WeightBox.vue'
import RatingBox from './tableComponents/RatingBox.vue'

export default {
  name: 'Table',
  components:{
      WeightBox,
      RatingBox
  },
  methods: {
    updateValue(newWeight, value){
        console.log(newWeight.keys+" "+value)
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
  }
}

</script>

<style>
.table {
    height: 100%;
    width: 100%;
    table-layout: fixed ;
    /* background-color: #b53230;     */
}

tr {


    background-color: white;
    color:#b00800;
    font-family: "HelveticaNeue-Roman";
}

th {

    background-color: #b00800;
    color:white;
    font-family: "HelveticaNeue-Roman";
    width: 200px;
    
}
td {
    text-align:center;
}
input{
  border: 1px solid #b00800;
  color:#b00800;
  width:30%;
  text-align:center
}

/* Hide input  */
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
/* .plus, .minus{
    display:flex;
    justify-content: center;
    align-items: center;

    width:10%;
    background-color:white;
    color:#b00800;
    text-align:center
}
#value-field{
    display: flex;
    flex-direction:row;
    justify-content: center;
} */


</style>

<style scoped>
button {
  background-color:#b00800;
  border: none;
  text-decoration: none;
  color: white;
  font-family: "HelveticaNeue-Bold";
}

#temp {
    text-align: center;
    width: 1fr;
}

#total-rating{
    background-color: #b00800;
    color: white;
    border:1px solid white;
}
#total-rating1{
    color:#b00800;
}
</style>