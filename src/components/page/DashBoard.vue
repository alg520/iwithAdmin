<template>
    <div >
        <!-- <v-pageTitle vtitle="主页"></v-pageTitle> -->

        <div class="clear"></div>

        <div style="margin:100px auto; text-align:center;">
            <img src="../../../static/images/robot.png" alt="">
            <img src="../../../static/images/logo.png" alt="">
        </div>

        <!-- <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="6">
                <el-card class="box-list">
                    Vuex 计数
                   <hr>
                   <count></count>
                </el-card>
            </el-col>
        </el-row> -->

    </div>



</template>

<script>
    import vPageTitle from '../common/pageTitle.vue';
    import count from '../common/count.vue';
    export default {
        data(){
           return{
              
           }
        },
        components:{
            vPageTitle,count
        }
    }
</script>

<style scoped>
    .el-col{
        /* margin-bottom:16px; */
        text-align:center;
    }
    .material-icons{
        font-size:80px;
        color:#ddd;
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