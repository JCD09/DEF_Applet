<template>
    <div class="rating-box">
        <button id="minus" @click="decrement(rating)">-</button>
        <label id="rating">{{rating}}</label>
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
                this.$emit('update_totals')

            }
        },
        decrement(currentRating){
            if(currentRating>0){
                var row = this.valueID;
                var col = this.alternativeID;
                var newRating = (currentRating-0.05).toFixed(2);
                this.$store.dispatch('updateAlternative',{newRating, row, col})
                this.$emit('update_totals')
            }
        },

    }
}
</script>

<style lang="scss" scoped>
@import '/src/index.scss';

.rating-box{

  display:flex;
  width: 80%;
  height: 40%;
  margin-left: auto;
  margin-right: auto;

}

#minus, #plus {
    width: 30%;
    text-align: center;
    text-decoration: none;
    // background-color: $primary;

    border: 2px solid $primary;
    color: $primary;
    background-color: $white;

    font-weight: 700;


}
#rating{
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>