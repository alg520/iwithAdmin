import { getLoginUser } from '../../api/user'
import * as types from '../mutation-types'
const user = {
    state:{
        loginInfo:{
            uname:'zhangpengbin'
        },
        userList:[],
        shopInfo:{},
        userId:'',
        uname:'',
        userType:'',
        sex:'',
        shopId:'',
        shop:{
            id:'',
            language:0,
            shopTel:'',
            taxRadio:'',
            wxMerchantId:'',
            wxPrivateKey:'',
            address:'',
            name:''
        }
    },

    getters:{

    },

    mutations:{
        [types.SET_LOGININFO](state,loginer){
            state.loginInfo = loginer;
        },
        [types.SET_USERLIST](state,userList){
            state.userList = userList;
        }
    },

    actions:{




    }
}

export default user;