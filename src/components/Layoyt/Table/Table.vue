<template>
  <div id="contents">
    <div id="table-container">
      <table>
      <thead>
          <tr>
            <th rowspan="2" colspan="1">Value</th>
            <th rowspan="2" colspan="1">Weight(%):</th>
            <template v-for="(alternative, name) in alternatives">
              <th id="alternative-header" colspan="2">{{name}}
                <i id="icon" class="fas fa-trash-alt" button @click="removeAlternative(name)" >
              </i>
              </th>
            </template>
          </tr>
          <tr>
            <template v-for="(alternative) in alternatives">
              <th >Rating</th>
              <th >Score</th>
            </template>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(row,rowID) in rows" 
                v-bind:key="rowID"
                v-bind:value="row">
                <td>{{row['value']}}
                  <i id="icon_value" class="fas fa-trash-alt" button @click="removeCurrentValue(rowID)" >
                </td>
                <td id="weight_box">
                    <WeightBox :maxValue="maxPerc+row['weight']" :field="row['weight']" :valueID="row['value']"></WeightBox>
                </td>
                <template v-for="(alternative, name) in row['alternatives']">
                  <td  id="rating_box" >
                      <RatingBox :rating="row['alternatives'][name]['weight']" 
                                 :valueID="row['value']" :alternativeID="name"
                                 @update_totals="updateTotals"></RatingBox>
                  </td>
                  <td id="score_box">
                    {{Number(row['alternatives'][name]['product']).toFixed(2)}}
                  </td>
                </template>
          </tr>
          <tr>
            
          </tr>
      </tbody>
      <tfoot>
              <tr >
                <td id="footer"  colspan="2"><b><center>Totals: Rating &#10005 Weight</center></td>
                <td class="scores" id="footer_totals" colspan="2" v-for="(alternative, name) in alternatives" v-bind:key="name">
                  {{
                    Number(Object.values(rows).map(row => row.alternatives).map(line=>line[name].product).
                    reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)}}
              </td>
      <tfoot>
    </table>
    </div>

    <!-- <div id="table-controls">
      <div id="add-row">
          Name:
          <input v-model="new_value">
          Number: {{weight}}
          <input id="test" type="range" min="1" :max="maxPerc" v-model="weight" class="slider">
          <button :disabled="!validatePercentage" @click="insertValue(new_value,weight)">Add Row</button>
        </div>
        <div id="add-column">
          <input v-model="new_alternative" id="new-alternative">
          <button @click="insertAlternative(new_alternative)">Add Column</button>
        </div>
      <div> -->
  <div id="buttons">
    <div id="new_alternative">
      <label>Insert New Alternative:</label>
      <input v-model="new_alternative">
      <i class="fas fa-plus-square" button @click="insertAlternative(new_alternative)" >
    </div>
    <div id="new_value">
      <label>Insert New Value:</label>
      <input v-model="new_value">
      <i class="fas fa-plus-square" button @click="insertValue(new_value,0)" >
    </div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// import components
import WeightBox from './TableComponents/WeightBox.vue'
import RatingBox from './TableComponents/RatingBox.vue'

export default {
  name: 'Table',
  components:{
    WeightBox,
    RatingBox
  },
  data() {
    return {
      weight: 0,
      new_value: "",
      new_alternative: ""
    }
  },
  computed:{
    ...mapState(['rows','alternatives','maxPerc', 'getRating']),

  },
  methods:{
    insertValue(name, value){
      // console.log(name+" "+value)
        let weight = parseInt(value)
        this.$store.dispatch('insertValue', {name, weight})
        this.new_value=""
        this.weight=0
        this.$forceUpdate()
  },
  removeCurrentValue(name){
        this.$store.dispatch('removeSelecedValue', name)
        this.$forceUpdate()
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
  insertAlternative(name){
    this.$store.dispatch('insertAlternative', name)
    this.$forceUpdate()
    this.new_alternative=""
  },
  removeAlternative(name){
    this.$store.dispatch('removeAlternative', name)
    this.$forceUpdate()
  },
  
  updateTotals(){
    var primary = "#B3291D"
    var grey = "#BDC7CC"
    var white = "#FFFFFF"
    var black = "#262626"
    var secondary = "#701515"

    console.log("updatng totals")
    var elements = document.getElementsByClassName('scores');
    if (elements.length > 0){
      var numbers = []
      for (var i = 0, length = elements.length; i < length; i++) {
        elements[i].style.backgroundColor=white
        elements[i].style.color=black
        numbers.push(parseFloat(elements[i].innerHTML))
      }
      var max_index = numbers.indexOf(Math.max(...numbers))
      elements[max_index].style.backgroundColor=secondary;
      elements[max_index].style.color=white;
      console.log("max index"+max_index)
  }
  }
}
}

</script>

<style lang="scss" scoped>
@import './src/index.scss';

#table-container {
  // overflow-x:scroll;
}

#table-controls {
  display: flex;
  flex-direction: row;
}

// #add_column{
//   width: 170px;
//   input{
//     border: none;
//     width: 130px;
//     color: $black;
//   }
//   i{
//       font-size: 24px;
//       display: inline;
//       vertical-align: middle;
//       cursor: pointer;

//   }
// }
table{
  // table-layout:auto;
  border-spacing: 0;
  
}

th{
  background-color: $primary;
  border-collapse:collapse;
  color: $white;

  padding: 0.5rem;
  text-align: left;

  min-width: 100px;
  min-height: 100px;

  border-left: 1px solid $white;
  border-right: 1px solid $white;
  border-bottom: 1px solid $white;
  border-top: 1px solid $white;

  font-family: $large-title;
  font-size: 18px;
}

#alternative-header{
  text-align: left;
}

td{
  height: 70px;

  border-left: 1px solid $white;
  border-right: 1px solid $white;
  // border-bottom: 1px solid $white;
  border-top: 1px solid $white;

  font-size: 16px;

}

#rating_box{
  width: 140px;
  font-size: 16px;
}

#weight_box{
  width: 140px;
  font-size: 16px;
}

#score_box{
  text-align: center;
}

#footer_totals{
text-align: center;

font-family: "HelveticaNeue-Roman";
font-weight: 700;

color: $black
}

#footer{
text-align: center;

font-family: $large-title;
font-size: 16px;
}

#icon{
  float:right;
  cursor: pointer;
}

#icon_value{
  float:right;
  color:$primary;
  cursor: pointer;
}


#buttons{
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content:flex-start;

  // border: 1px solid $black;
  width:350px;

  font: $small-title;

  #new_alternative{
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-around;
    align-content:center;
    width:100%;
    
    margin-left:10px;
    label{
      width: 200px;
    }

    input{
      border:1px solid $primary;
      color: $black;
      width: 100px;
    }

    i{
      font-size:28px;
      color: $primary;
      cursor: pointer;
    }
  }

 #new_value{

    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-around;
    align-content:center;
    width:100%;
    
    margin-left:10px;
    label{
      width: 200px;
    }

    input{
      border:1px solid $primary;
      color: $black;
      width: 100px;
    }

    i{
      font-size:28px;
      color: $primary;
      cursor: pointer;
    }
  }

}

</style>