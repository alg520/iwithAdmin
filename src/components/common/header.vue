<template>
    <div class="header">
        <el-row :gutter="5">
            <!--Logo area-->
            <el-col :xs="12" :sm="12" :md="4">
                <div class="logo">
                    <span class="logo_prefix">iWith</span>
                    <span class="logo_suffix">Admin</span>
                </div>
            </el-col>    
            
            <!-- header right area-->
            <el-col :xs="24" :sm="12" :md="{span:8,offset: 4}">
                <div class="website" style="text-align:center;">
                    <span>{{$t('skin')}}+{{$t('navList.one')}}</span>
                    <span>Website:</span>
                    <span>www.iWith.com</span>
                </div>
            </el-col>            
    
            <el-col :xs="8" :sm="8" :md="8">
                <div class="user-header pull-right">
                    <el-dropdown trigger="click" menu-align="start">
                        <img src="../../../static/images/b_header2.jpg" width="50px" />
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div class="setting-div" @click="changeLanguage()">                                    
                                    <span class="setting-string">切换语言</span>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div class="setting-div">
                                    <!-- <span class="setting-icon">
                                        <i class="iconfont icon-user"></i>
                                    </span> -->
                                    <span class="setting-string">当前用户：{{USERINFO.uname}}</span>
                                </div>
                            </el-dropdown-item>
                            <!-- <el-dropdown-item divided>
                                <div class="setting-div">
                                    <span class="setting-icon">
                                        <i class="iconfont icon-tuichu"></i>
                                    </span>
                                    <span class="setting-string">设置</span>
                                </div>    
                            </el-dropdown-item> -->
                            <el-dropdown-item divided>
                                <div class="setting-div" @click="userLogout()">
                                    <!-- <span class="setting-icon">
                                        <i class="iconfont icon-tuichu"></i>
                                    </span> -->
                                    <span class="setting-string"> 退出</span>
                                </div>
                            </el-dropdown-item>
    
                        </el-dropdown-menu>
                    </el-dropdown>                        
                </div>                   
            </el-col>
        </el-row>
    
    </div>
</template>

<script>
import {LANGS} from '@/i18n/lang'
import Vue from 'vue'
import Lockr from 'lockr'
import Cookies from 'js-cookie'
import { logout } from '../../api/user'
export default {
    data() {
        return {
            name: 'linxin',
            locale: 'zh-CN',
            langs: LANGS
        }
    },
    computed : {

        USERINFO(){
            return Lockr.get("USERINFO");
        }
        
        
    },
    mounted(){
        Vue.config.lang = this.locale;
    },
    created(){
        console.log("langs:",LANGS);
    },
    methods: {
        userLogout(){
            logout().then(res => {                
                if(res.status){
                    Cookies.remove('Token');
                    Cookies.remove('TY');
                    this.$router.push({
                        path:'/loginIn'
                    });
                }
            })
        },
        changeLanguage(){

            if(this.locale == 'jp-JA'){
                this.locale = 'zh-CN';
            } else {
                this.locale = 'jp-JA';
            }
            
            Vue.config.lang = this.locale;
            
        }
    }
}
</script>
<style scoped>
.header {
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 66px;
    font-size: 14px;
    line-height: 66px;
    background-color: #324157;
    box-shadow: 2px 0 3px rgba(0, 0, 0, .5);
    z-index: 1000;
    padding: 0 32px 0 40px;
    overflow: hidden;
}

.header .logo {
    float: left;
    cursor: pointer;
    font-size: 22px;
}

.logo_prefix {
    color: #209e91;
}

.logo_suffix {
    color: #fff;
}

.header .search {
    float: left;
    color: #fff;
    font-size: 14px;
}

.website span {
    display: inline-block;
    color: #209e91;
}

.website span:first-child {
    color: #fff;
}

.user-header {
    line-height: 10px;
    padding-top: 7px;
    font-size: 12px;
}

.user-header img {
    border-radius: 50%;
    cursor: pointer;
}

.pop-image {
    display: block;
    float: left;
}

.pop-image img {
    border-radius: 50%;
}

.pop-div {
    height: 55px;
    clear: both;
}

.pop-content {
    display: block;
    font-size: 12px;
    line-height: 14px;
    padding-top: 15px;
    margin-left: 60px;
}

.pop-time {
    display: block;
    float: right;
    font-size: 10px;
    color: #ccc;
}

.pop-title {
    font-size: 12px;
    color: #209e91;
}

.task-div {
    clear: both;
    height: 55px;
}

.task-span {
    display: block;
    float: left;
    font-size: 12px
}

.task-content {
    width: 160px;
    line-height: 16px;
    margin-left: 10px;
    padding: 5px;
}

.task-time {
    clear: both;
    float: right;
    color: #ccc;
}

.setting-div {
    height: 30px;
    line-height: 30px;
    clear: both;
}

.setting-div span {
    display: block;
    float: left;
    font-size: 12px;
}

.setting-icon {
    padding-top: 3px;
    padding-right: 3px;
}
</style>
