import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    count:1,
    status:'alllist'
}

const mutations = {
    add(state){
        state.count++;
    },
    reduce(state){
        state.count--;
    },
    changeStatus(state,name){
        state.status = name;
    }
}

const getters = {
    count:function(state){
        return state.count += 100;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters
})






