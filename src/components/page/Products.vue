<template>
    <div class="productLists">
        <v-pageTitle vtitle="全部商品"></v-pageTitle>

        <div class="clear"></div>

        <el-row v-if="$store.state.status == 'alllist'">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <transition mode="out-in">                                               
                         <allList></allList> 
                    </transition>                                    
                </div>
            </el-col>
        </el-row>

         <el-row v-if="$store.state.status == 'addlist'">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <addList></addList>
                </div>
            </el-col>
        </el-row>

        <el-row v-if="status == 'updatelist'">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <addList></addList>
                </div>
            </el-col>
        </el-row> 
    </div>    

</template>

<script>
    import store from '@/store/index';
    import vPageTitle from '../common/pageTitle.vue';
    import allList from '../products/allList.vue';
    import addList from '../products/addList.vue';
    export default {
        data(){
           return{
              //percentage:10
              status:'alllist',

           }
        },
        computed:{
            count(){
                return this.$store.this.state.status;
            }
        },
        components:{
            vPageTitle,allList,addList
        },
        methods:{
            //添加 根据当前页面的status 修改 vtitle 的值
        },
        store
    }
</script>

<style scoped>
    .el-col{
        margin-bottom:16px;
        text-align:center;
    }
    .material-icons{
        font-size:80px;
        color:#ddd;
    }
    .box-card{
        height:110px;
    } 
    .cart-string{
        height:100px;
        padding-top:10px;
        font-size:1.1rem;
        
    }
    .box-chart{
        height:420px;
    }
    .box-list{
        height:auto;
        text-align:left;
    }
    .box-list hr{
        height:1px;
        border:none;
        border-top:1px  dashed #ccc;
        margin-bottom:5px;
        margin-top:6px;

    }
</style>