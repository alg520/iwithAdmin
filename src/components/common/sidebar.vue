<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="/dashboard">               
                    <span class="sb-icon"><i class="iconfont icon-zhuye"></i></span>
                    <span class="sb-cn">主页</span>
            </el-menu-item>
            <!-- v-if="authType == 3 || authType == 4" -->
            <el-menu-item index="/products" v-if="authType == 3 || authType == 4">
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
            <!-- v-if="authType == 3" -->
            <el-submenu index="2" v-if="authType == 3">
                <template slot="title">               
                    <span class="sb-icon"><i class="iconfont icon-tian"></i></span>
                    <span class="sb-cn">提案管理</span>                 
                </template>
                <el-menu-item index="/introduce">提案分组</el-menu-item>                     
            </el-submenu>
            <!-- v-if="authType == 3" -->
            <el-submenu index="3" v-if="authType == 3">
                <template slot="title">
                    <span class="sb-icon"><i class="iconfont icon-yunying"></i></span>
                    <span class="sb-cn">商家管理</span>
                </template>
                <el-menu-item index="/shop/info">信息管理</el-menu-item>
                <el-menu-item index="/shop/order">订单管理</el-menu-item>
            </el-submenu>

            <el-submenu index="4" v-if="authType == 1 || authType == 2">
                <template slot="title">
                    <span class="sb-icon"><i class="iconfont icon-yunying"></i></span>
                    <span class="sb-cn">运营管理</span>                 
                </template>
                <el-menu-item index="/operation/shopmanage">店铺管理</el-menu-item>
                <el-menu-item index="/operation/ordermanage">订单管理</el-menu-item>
                <el-menu-item index="/operation/robot">机器人管理</el-menu-item>
                <el-menu-item index="/operation/otamanage">OTA升级管理</el-menu-item>
            </el-submenu>
           
        </el-menu>
    </div>
</template>
<script>
import $http from '../../utils/http'
import { getLoginUser } from '../../api/user'
    export default {
        data(){
            return {
                authType:''
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            this.getLoginUserInfo();            
        },
        methods:{
            //获取登录信息
            getLoginUserInfo(){
                getLoginUser().then( res => {
                    console.log("用户登录信息",res);

                    if(res.status){

                        console.log("用户登录信息",res.entry);
                        this.authType = res.entry.userType;

                    } else {
                        this.$router.push({
                            path:'/loginIn'
                        });
                    }

                })
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
