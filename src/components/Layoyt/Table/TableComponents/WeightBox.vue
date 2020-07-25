<template>
    <div class="weight-box">
        <div v-if="!slider">
            <button id="minus" @click="decrement(field)">-</button>
            <label @click="toggle(true)" id="field">{{field}}</label>
            <button id="plus" @click="increment(field)">+</button>
        </div>
         <div v-else @click="toggle(false)">
             <input type="range" min="0" :max="maxValue" class="slider" id="slider"
             v-model="newWeight"  :oninput="updateValue(this.newWeight, this.valueID)"
             :data-popup-enabled="true" :data-show-value="true">
             <output for="range-slider">{{newWeight}}</output>
        </div>
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
    data() {
        return {
            slider: true,
            newWeight: this.field,
            value: this.valueID
        }
    },    
    methods: {
        toggle(value){
            this.slider=value;
        },
        increment(currentField){
            if((currentField < this.maxValue)){
                var value= this.valueID
                var newWeight=currentField+1;
                this.$store.dispatch('updateValue',{newWeight, value})
                var elements = document.getElementsByClassName('scores');
                if (elements.length > 0){
                var numbers = []
                for (var i = 0, length = elements.length; i < length; i++) {
                    numbers.push(parseFloat(elements[i].innerHTML))
                }
                var max_index = numbers.indexOf(Math.max(...numbers))
                elements[max_index].style.backgroundColor="$primary";
                elements[max_index].style.color="$white";    
            }
        }},
        decrement(currentField){
            if((currentField>0)){
                var value = this.valueID
                var newWeight=currentField-1;
                this.$store.dispatch('updateValue',{newWeight, value})
            }
        },
        updateValue(newWeight, value){
            this.$store.dispatch('updateValue',{newWeight, value})
            // this.$forceUpdate()
        },
    }
}
</script>

<style lang="scss" scoped>
@import '/src/index.scss';

// import built-in sass file
.weight-box{

  display:flex;
  width: 80%;
  height: 40%;
  margin-left: auto;
  margin-right: auto;

  div{
    display:flex;
    width: 100%;
    height: 100%;
  }
  div{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    input{
        width:100%;
    }
  }

}

#minus, #plus {
    width: 30%;
    text-align: center;
    text-decoration: none;
    // background-color: $primary;
    // color: $white;

    border: 2px solid $primary;
    color: $primary;
    background-color: $white;

    font-weight: 700;
}
#field{
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;

}
</style>