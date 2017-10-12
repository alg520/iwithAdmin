<template>
    <div class="productLists">
        <!-- <v-pageTitle vtitle="全部商品"></v-pageTitle> -->
        <el-menu :default-active="activeIndex" class="el-menu-product" mode="horizontal" @select="handleSelect" router>
            <el-menu-item index="list">菜品列表</el-menu-item>
            <el-menu-item index="catalog">类目管理</el-menu-item>
            <el-menu-item index="attrlist">属性管理</el-menu-item>
            <el-menu-item index="timeduration">时段管理</el-menu-item>
            <el-menu-item index="sidedishes">配菜管理</el-menu-item>
        </el-menu>        
    
        <div class="clear"></div>
    
        <div class="content-list" id="content-list">

            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
           
        </div>
    
    </div>
</template>

<script>
import vPageTitle from '../common/pageTitle.vue';
export default {
    data() {
        return {
            status: 'alllist',
            activeIndex: 'list',
        }
    },
    
    components: {
        vPageTitle
    },

    computed: {
        
        onRoutes(){
            return this.$route.path.replace('/dashboard','/products/list');
        }
    }, 
    
    mounted: function () {

        //动态计算属性导航的高度
        var contentHeight = document.body.clientHeight - 151;
        document.getElementById("content-list").style.height = contentHeight + 'px';

    },
    
    methods: {
        //添加 根据当前页面的status 修改 vtitle 的值
        handleSelect(key, keyPath) {
            console.log(key, keyPath);

            console.log(this.$route.path)
        }
    }    
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
    border: none;    
    background-color: #fff;
}

.el-menu-product .is-active {
    border-bottom: solid 5px #20a0ff;
}
</style>