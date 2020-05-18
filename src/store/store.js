import Vue from 'vue'
import Vuex from 'vuex'

import Value from '../classes/Value.js'

import { mapGetters, mapState } from 'vuex'

const INSERT_VALUE = 'INSERT_VALUE'
const REMOVE_CURRENT_VALUE = 'REMOVE_CURRENT_VALUE'
const INSERT_ALTERNATIVE = 'INSERT_ALTERNATIVE'
const REMOVE_CURRENT_ALTERNATIVE = 'REMOVE_CURRENT_ALTERNATIVE'
const UPDATE_VALUE = 'UPDATE_VALUE'
const UPDATE_ALTERNATIVE = 'UPDATE_ALTERNATIVE'

const update = state => state.maxPerc = 100-(Object.values(state.rows).map(row => row.weight)).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
0)

Vue.use(Vuex)



export default new Vuex.Store({
    state: {
        // list of alternatives 
        alternatives: {},

        // corresponding rows. value name - row pair  
        rows: {},

        // available percentage
        maxPerc: 100,
    },
    
    getters:{
        getRating: state => 
           { return (row,col) => {
                return state.rows[row]['alternatives'][col]
          }}
    },

    mutations:{

        [INSERT_VALUE](state,payload){

            var row = {}
            row['value']=payload.name
            row['weight']=payload.weight
            row['alternatives']={}
            
            // iterate through available alternatives and insert them into the object row 
            Object.entries(state.alternatives).forEach(([key,_]) => row['alternatives'][key]=0)
            
            // insert new row
            state.rows[payload.name]=row

            // state.availPercentage=this.getters.calcNewPercentage
            update(state)

            // update available percentage 
        },

        [REMOVE_CURRENT_VALUE](state,payload){
            delete state.values[payload]
            state.availPercentage=this.getters.calcNewPercentage
            update(state)
        },

        [INSERT_ALTERNATIVE](state,payload){

            // insert new alternative into object
            state.alternatives[payload]=payload

            // for each row(value) insert new alternative/weight pair
            Object.values(state.rows).forEach(row => {row['alternatives'][payload]=0})
        
        },

        [REMOVE_CURRENT_ALTERNATIVE](state,payload){
            delete state.alternatives[payload]
        },

        [UPDATE_VALUE](state,payload){
            state.rows[payload.value]['weight']=parseInt(payload.newWeight)
            update(state)
            //console.log(state.rows[payload.value])
        },

        [UPDATE_ALTERNATIVE](state,payload){
            state.rows[payload.row]['alternatives'][payload.col]=parseFloat(payload.newRating)
            console.log(parseFloat(payload.newRating))
        }

    },

    actions:{
        insertValue({commit}, payload){
           commit(INSERT_VALUE,payload)
        },
        removeSelecedValue({commit},payload){
            commit(REMOVE_CURRENT_VALUE,payload)
        },
        insertAlternative({commit}, payload){
            commit(INSERT_ALTERNATIVE,payload)
         },
        removeAlternative({commit},payload){
            commit(REMOVE_CURRENT_ALTERNATIVE,payload)
        },
        updateValue({commit},payload){
            commit(UPDATE_VALUE,payload)
        },
        updateAlternative({commit},payload){
            commit(UPDATE_ALTERNATIVE,payload)
        }
    },
});