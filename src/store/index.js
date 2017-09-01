import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import user from './modules/user'
import shop from './modules/shop'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

//开发环境调试
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules:{
        user,
        shop
    },
    state,
    mutations,
    getters,
    actions,
    strict:debug,
    plugins:debug ? [createLogger()]:[]    
})






