<template>
    <div class="weight-box">
        <button id="minus" @click="decrement(field)">-</button>
        <div id="field">{{field}}</div>
        <button id="plus" @click="increment(field)">+</button>
    </div>
</template>

<script>

export default {
    
    name: 'WeightBox',
    props:{
        maxValue: Number,
        field: Number,
        valueID: String,
    },
    methods: {
        increment(currentField){
            if((currentField < this.maxValue)){
                var value= this.valueID
                var newWeight=currentField+1;
                this.$store.dispatch('updateValue',{newWeight, value})
            }
        },
        decrement(currentField){
            if((currentField>0)){
                var value = this.valueID
                var newWeight=currentField-1;
                this.$store.dispatch('updateValue',{newWeight, value})
            }
        },
        // updateValue(newWeight, valueID){
        //     console.log(newWeight.keys+" "+value)
        //     this.$store.dispatch('updateValue',{newWeight, valueID})
        //     this.$forceUpdate()
        //     // dispatch update signal
        // },
    }
}
</script>

<style>

.weight-box{
    width:50%;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #b00800
}

#minus, #plus {
  width: 30%;
  background-color:#b00800;
  border: none;
  text-decoration: none;
  color: white;
  font-family: "HelveticaNeue-Bold";
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #b00800
}

#field{
    width: 40%;
    display:flex;
    justify-content: center;
    align-items: center;
   
}
</style>