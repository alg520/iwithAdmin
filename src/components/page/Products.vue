<template>
    <div class="productLists">
        <v-pageTitle vtitle="全部商品"></v-pageTitle>
    
        <div class="clear"></div>
    
        <div class="content-list">
            <el-row v-if="$store.state.status == 'alllist'">
                <el-col :sm="6" :md="6" :lg="5">
                    <!-- <attrList></attrList> -->
                    <catalog></catalog>
                </el-col>
                <el-col :sm="18" :md="18" :lg="19">
                    <transition mode="out-in">
                        <allList></allList>
                    </transition>
                </el-col>
            </el-row>
    
            <el-row v-if="$store.state.status == 'updatelist'">
                <el-col :span="5">
                    <attrList></attrList>
                </el-col>
                <el-col :span="19">
                    <transition mode="out-in">
                        <allList></allList>
                    </transition>
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
    
    </div>
</template>

<script>
import store from '@/store/index';
import vPageTitle from '../common/pageTitle.vue';
import allList from '../products/allList.vue';
import attrList from '../products/itemAttr.vue';
import catalog from '../products/catalog.vue';
import addList from '../products/addList.vue';
export default {
    data() {
        return {
            status: 'alllist'
        }
    },
    
    components: {
        vPageTitle, allList, addList, attrList,catalog
    },

    computed: {
        count() {
            return this.$store.this.state.status;
        }
    },    
    
    methods: {
        //添加 根据当前页面的status 修改 vtitle 的值
    },
    store
}
</script>

<style scoped>
.el-col {
    text-align: center;
}

.material-icons {
    font-size: 80px;
    color: #ddd;
}

.box-card {
    height: 110px;
}

.cart-string {
    height: 100px;
    padding-top: 10px;
    font-size: 1.1rem;
}

.box-list {
    height: auto;
    text-align: left;
}

.box-list hr {
    height: 1px;
    border: none;
    border-top: 1px dashed #ccc;
    margin-bottom: 5px;
    margin-top: 6px;
}

.content-list {
    border: 1px solid #ccc;    
    background-color: #fff;
}
</style>