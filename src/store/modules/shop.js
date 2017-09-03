import { getLoginUser } from '../../api/shop'
import { SET_SHOPLIST,SET_SHOPINFO } from '../mutation-types'

const shop = {
    state:{
        shopList:[],
        shopId:'',
        shopInfo:''
    },

    mutations:{
        [SET_SHOPLIST](state,data){
            state.shopList = data;
        },
        [SET_SHOPINFO](state,data){
            state.shopInfo = data;
        }
    },

    getters:{
        shopInfo : state => state.shopInfo,
        shopId: state => state.shopId,
        shopList : state => state.shopList
    },

    actions:{

    }
}

export default shop;