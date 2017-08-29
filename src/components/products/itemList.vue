<template>
    <el-row>
        <el-col :sm="6" :md="6" :lg="5">            
            <catalog></catalog>
        </el-col>
        <el-col :sm="18" :md="18" :lg="19">
            <transition mode="out-in">
                <allList></allList>
            </transition>
        </el-col>
    </el-row>
</template>

<script>
import store from '@/store/index';
import allList from '../products/allList.vue';
import attrList from '../products/itemAttr.vue';
import catalog from '../products/catalog.vue';
import addList from '../products/addList.vue';
export default {
    data() {
        return {
            status: 'alllist',
            activeIndex: '1',
        }
    },
    
    components: {
        allList, addList, attrList,catalog
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
