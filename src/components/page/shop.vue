<template>
  <div class="shopLists">
        <v-pageTitle vtitle="商家管理"></v-pageTitle>
    
        <div class="clear"></div>
    
        <div class="content-list" id="content-list">

            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
           
        </div>
    
    </div>
</template>

<script>
import vPageTitle from '../common/pageTitle.vue'
import * as user from '../../api/user'
import {mapMutations} from 'vuex'
import { mapGetters } from 'vuex'
export default {
    components:{
        vPageTitle
    },
    data(){
        return {
            
        }
    },
    mounted: function() {

        //动态计算属性导航的高度
        var contentHeight = document.body.clientHeight - 151;
        document.getElementById("content-list").style.height = contentHeight + 'px';

    },
    computed:{
        ...mapGetters([
            'user'
        ])
    },
    created(){
        console.log(this.user);
        this.getUserList();
    },
    methods :{

        getUserList(){
            user.getUserList().then(response => {
                console.log(response);
            })
        },

        ...mapMutations({
            getUser:'GET_USER'
        })
    }
}
</script>

<style>
.content-list {
    border: 1px solid #ccc;
    background-color: #fff;
    overflow-y: auto;
}
</style>
