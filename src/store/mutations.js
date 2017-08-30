import * as types from './mutation-types'

const mutations = {
    [types.GET_USER](state,user){
        state.user = user;
    }
}

export default mutations