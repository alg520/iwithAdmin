<template>
    <div >
        <!-- <v-pageTitle vtitle="主页"></v-pageTitle> -->

        <div class="clear"></div>

        <div style="margin:100px auto; text-align:center;">
            <img src="../../../static/images/robot.png" alt="">
            <img src="../../../static/images/logo.png" alt="">
        </div>        

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