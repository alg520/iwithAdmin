import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions'
//import * as getters from './getters'
//import state from './state'
//import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

//声明公共的状态管理
const state = {
    count:1,
    status:'alllist',
    itemType:[
        {name:'单点',value:1},
        {name:'套餐',value:2},
        {name:'配菜',value:3}
    ],
    busiType:[
        {name:'点餐系统',value:1},
        {name:'民宿',value:2},
        {name:'零售',value:3}
    ]
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
    getters,
    actions
})






