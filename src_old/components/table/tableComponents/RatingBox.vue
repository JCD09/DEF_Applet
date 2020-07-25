<template>
    <div class="weight-box">
        <button id="minus" @click="decrement(rating)">-</button>
        <div id="rating">{{rating}}</div>
        <button id="plus" @click="increment(rating)">+</button>
    </div>
</template>

<script>

export default {
    
    name: 'RatingBox',
    props:{
        rating: Number,
        valueID: String,
        alternativeID: String,
    },
    methods: {
        increment(currentRating){
            if(currentRating<1){
                var row = this.valueID;
                var col = this.alternativeID;
                var newRating = (currentRating+0.05).toFixed(2);
                console.log("newRating is"+newRating)
                this.$store.dispatch('updateAlternative',{newRating, row, col})

            }
        },
        decrement(currentRating){
            if(currentRating>0){
                var row = this.valueID;
                var col = this.alternativeID;
                var newRating = (currentRating-0.05).toFixed(2);
                this.$store.dispatch('updateAlternative',{newRating, row, col})
            }
        }
    }
}
</script>

<style>

.weight-box{
    width:60%;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #b00800;
    margin:auto;
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

#rating{
    width: 40%;
    display:flex;
    justify-content: center;
    align-items: center;
   
}
</style>