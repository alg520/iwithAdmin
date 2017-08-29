<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="dashboard">               
                    <span class="sb-icon"><i class="iconfont icon-zhuye"></i></span>
                    <span class="sb-cn">主页</span>
            </el-menu-item>
            <el-menu-item index="products">
                <span class="sb-icon"><i class="iconfont icon-caipinyugao"></i></span>                
                <span class="sb-cn">商品管理</span>
            </el-menu-item>
            <!-- <el-submenu index="1">
                <template slot="title">
                    <span class="sb-icon"><i class="iconfont icon-caipinyugao"></i></span>
                    <span class="sb-cn">商品管理</span> 
                </template>
                <el-menu-item index="products">商品列表</el-menu-item>
                <el-menu-item index="typeManage">目录管理</el-menu-item>
                <el-menu-item index="tastemanage">属性管理</el-menu-item>
                <el-menu-item index="shoptimeduration">时段管理</el-menu-item>                
            </el-submenu> -->

            <el-submenu index="2">
                <template slot="title">               
                    <span class="sb-icon"><i class="iconfont icon-tian"></i></span>
                    <span class="sb-cn">提案管理</span>                 
                </template>
                <el-menu-item index="introduce">提案分组</el-menu-item>                     
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">               
                    <span class="sb-icon"><i class="iconfont icon-yunying"></i></span>
                    <span class="sb-cn">运营管理</span>                 
                </template>
                <el-menu-item index="operation">店铺管理</el-menu-item>
                <el-menu-item index="operation">订单管理</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title">               
                    <span class="sb-icon"><i class="iconfont icon-yunying"></i></span>
                    <span class="sb-cn">商家管理</span>                 
                </template>
                <el-menu-item index="operation">信息管理</el-menu-item>
                <el-menu-item index="operation">订单管理</el-menu-item>
            </el-submenu>

            <!-- <el-submenu index="3">
                <template slot="title">
                    <span class="sb-icon"><i class="material-icons">pie_chart</i></span>
                    <span class="sb-cn">餐饮集团</span>
                </template>
                <el-menu-item index="BasicCharts"> 分店信息</el-menu-item>
                <el-menu-item index="BasicCharts"> 机器人数量</el-menu-item>
                <el-menu-item index="BasicCharts"> 分店机器人数量</el-menu-item>
                <el-menu-item index="BasicCharts">机器人点餐总营业额</el-menu-item>
                <el-menu-item index="BasicCharts"> 意见反馈</el-menu-item>
                <el-menu-item index="BasicCharts"> 菜品信息</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title">
                    <span class="sb-icon"><i class="material-icons">content_paste</i></span>
                    <span class="sb-cn">商铺</span>
                </template>               
                <el-menu-item index="FormLayouts"> 菜品信息</el-menu-item>
                <el-menu-item index="FormLayouts"> 菜品同步相关操作</el-menu-item>
                <el-menu-item index="FormLayouts"> 机器人信息</el-menu-item>
                <el-menu-item index="FormLayouts"> 广告相关</el-menu-item>
                <el-menu-item index="FormLayouts"> 电源管理</el-menu-item>
                <el-menu-item index="FormLayouts"> 相框管理</el-menu-item>
            </el-submenu> -->

             <!-- <el-submenu index="5">
                <template slot="title">
                    <span class="sb-icon"><i class="material-icons">border_all</i></span>
                    <span class="sb-cn">Tables</span>
                </template>
                <el-menu-item index="BasicTables"> Basic Tables</el-menu-item>                
            </el-submenu>     -->
        </el-menu>
    </div>
</template>
<script>
    export default {
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 66px;
        bottom:0;
        background: #324157;       
    }
    .sidebar > ul {
        height:100%;
    }

    .el-menu-item, .el-submenu__title{
        font-size:14px;     
    }
     
    .material-icons {font-size:12px;}
</style>
