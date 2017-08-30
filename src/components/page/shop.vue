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
    computed:{
        ...mapGetters([
            'user'
        ])
    },
    created(){
        console.log(this.user);
    },
    methods :{
        ...mapMutations({
            getUser:'GET_USER'
        })
    }
}
</script>

<style>

</style>
