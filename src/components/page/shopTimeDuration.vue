<template>
    <div class="productLists">
        <v-pageTitle vtitle="时段管理"></v-pageTitle>

        <div class="clear"></div>

        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <timeList></timeList>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import vPageTitle from '../common/pageTitle.vue';
    import timeList from '../products/timeList.vue';
    export default {
        data(){
           return{
              //percentage:10
           }
        },
        components:{
            vPageTitle,timeList
        }
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
     
</style>