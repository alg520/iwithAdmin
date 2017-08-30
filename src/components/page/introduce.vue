<template>
    <div class="introduceLists">
        <v-pageTitle vtitle="全部提案"></v-pageTitle>
    
        <div class="clear"></div>
    
        <div class="content-list introduce-list" id="introduce-list">

            <template>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="提案管理" name="first">
                        <introduceManage></introduceManage>
                    </el-tab-pane>
                    <el-tab-pane label="分组管理" name="second">
                        <introduceGroup></introduceGroup>
                    </el-tab-pane>                
                </el-tabs>
            </template>
            
        </div>
    
    </div>
</template>

<script>
import store from '@/store/index';
import vPageTitle from '../common/pageTitle.vue';
import introduceManage from '../introduce/introduceManage.vue';
import introduceGroup from '../introduce/introduceGroup.vue';

export default {
    data() {
        return {
            activeName: 'first'
        }
    },
    
    components: {
        vPageTitle,introduceManage,introduceGroup
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

.content-list {
    border: 1px solid #ccc;    
    background-color: #fff;
}

.el-tab-pane {
    margin-bottom: 0;
}
</style>