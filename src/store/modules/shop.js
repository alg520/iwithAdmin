import { getLoginUser } from '../../api/shop'
import { SET_SHOPLIST } from '../mutation-types'

const shop = {
    state:{
        shopList:[],
        shopId:''
    },

    mutations:{
        [SET_SHOPLIST](state,data){
            state.shopList = data;
        }
    },

    actions:{

    }
}

export default shop;