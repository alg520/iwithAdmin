<template>
    <div class="productLists">
        <v-pageTitle vtitle="分类管理"></v-pageTitle>

        <div class="clear"></div>

        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <typeList></typeList>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import vPageTitle from '../common/pageTitle.vue';
    import typeList from '../products/typeList.vue';
    export default {
        data(){
           return{
              //percentage:10
           }
        },
        components:{
            vPageTitle,typeList
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