import Vue from 'vue'
import Vuex from 'vuex'

import Value from '../classes/Value.js'
import { mapGetters, mapState } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        test: 'test',
        values: new Map()
    },
    // getters, return computed substate of the current state. 
    // as far as i understand
    getters:{
        // return the array of values?
        size: state => {return state.values.size}
    },
    mutations:{
        insertValue(name,weight){
            state.values.set(name,new Value(name,weight))
        },
        removeValue(name){
            state.values.delete(name)
        }
    },
    actions:{
        // insertValue(context){
        //     context.commit('insertValue');
        // }
    }
});