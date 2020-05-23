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

        // colors 
        colors: ['primary', 'secondary', 'success','warning','danger ','info','light','dark']
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
            
            Object.entries(state.alternatives).forEach(([key,_]) => row['alternatives'][key]={weight:0,product:0})
            state.rows[payload.name]=row
            update(state)
        },

        [REMOVE_CURRENT_VALUE](state,payload){
            delete state.rows[payload]
            state.availPercentage=this.getters.calcNewPercentage
            update(state)
        },

        [INSERT_ALTERNATIVE](state,payload){

            state.alternatives[payload]=payload
            Object.values(state.rows).forEach(row => {row['alternatives'][payload]={weight:0,product:0}})
        
        },

        [REMOVE_CURRENT_ALTERNATIVE](state,payload){
            console.log(payload)
            delete state.alternatives[payload]
            Object.values(state.rows).map(row=>delete row.alternatives[payload])
        },

        [UPDATE_VALUE](state,payload){
            var newWeight = parseInt(payload.newWeight)
            state.rows[payload.value]['weight'] = newWeight
            Object.values(state.rows[payload.value].alternatives).forEach(alternative=>alternative.product=newWeight*alternative.weight)
            update(state)
        },

        [UPDATE_ALTERNATIVE](state,payload){
            console.log(payload)
            var newWeight = parseFloat(payload.newRating)
            var value = state.rows[payload.row].weight
            state.rows[payload.row]['alternatives'][payload.col]['weight']=newWeight
            state.rows[payload.row]['alternatives'][payload.col]['product']=newWeight*value
            update(state)
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