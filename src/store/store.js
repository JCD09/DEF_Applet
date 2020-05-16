import Vue from 'vue'
import Vuex from 'vuex'

import Value from '../classes/Value.js'

import { mapGetters, mapState } from 'vuex'

const ADD_NEW_ALTERNATIVE = 'ADD_NEW_ALTERNATIVE'
const REMOVE_CURRENT_ALTERNATIVE = 'REMOVE_CURRENT_ALTERNATIVE'

const update = state => state.maxPerc = 100-Object.values(state.values).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
0)

Vue.use(Vuex)



export default new Vuex.Store({
    state: {
        values: {},
        maxPerc: 100,
    },
    
    getters:{
        // return the array of values?
        mapSize: state => {return state.values.size},

        listAlternatives: state => {
            return state.values 
        },

        getAvailablePercentage: state => {
            return state.maxPerc
        },
    },

    mutations:{

        [ADD_NEW_ALTERNATIVE](state,payload){
            state.values[payload.name]=payload.weight
            state.availPercentage=this.getters.calcNewPercentage
            update(state)
        },

        [REMOVE_CURRENT_ALTERNATIVE](state,payload){
            delete state.values[payload]
            state.availPercentage=this.getters.calcNewPercentage
            update(state)
        }

    },

    actions:{
        insertNewAlternative({commit}, payload){
           commit(ADD_NEW_ALTERNATIVE,payload)
        },
        removeSelecedAlternative({commit},payload){
            commit(REMOVE_CURRENT_ALTERNATIVE,payload)
        }
    },
});