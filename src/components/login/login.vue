<template>
    <div class="login-container">
        <div class="login-title">
            <span>IWITH 商家管理系统</span>
        </div>
        <div class="login-middle">
            <el-row :gutter="20">
                <el-col :span="14">                     
                     <div class="middle-left">
                         &nbsp;
                     </div>
                </el-col>
                <el-col :span="10">                    
                    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="top" label-width="0px" class="login-form">
                        
                        <el-form-item prop="username">
                            <p>用户名:</p>                            
                            <el-input class="login-input" name="username" type="text" v-model="loginForm.username" placeholder="用户名" />
                        </el-form-item>
                        <el-form-item prop="upassword">
                            <p>密码:</p>                            
                            <el-input class="login-input" name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.upassword" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item prop="authCode" class="authCode-Form">
                            <el-input class="authCode-input" name="authCode" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.authCode" placeholder="请输入验证码"></el-input>
                            <a href="javascript:;" @click="getAuthCode()" style="display:inline-block;height:30px;" class="pull-right">
                                <img :src="authCodeSrc" alt="验证码" class="authCodeImg">
                            </a>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="loginBtn" style="width:100%;" @click.native.prevent="handleLogin">
                                登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <div class="login-footer">
            <p>Copyright © 版权所有 深圳市艾唯尔科技有限公司 
                <span style="padding-left:50px;">                     
                    <el-tooltip placement="top">
                        <div slot="content">                            
                            <span>联系电话：（+86）0755-28219929</span>
                            <br>
                            <span>联系手机号：（+86）18666286292</span>
                        </div>
                        <el-button type="text" class="footer-us">联系我们</el-button>
                    </el-tooltip>
                </span>
                &emsp;|&emsp;
                <span><el-button type="text" class="footer-web">IWITH 官网</el-button></span>
            </p>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import $http from '../../utils/http'
import { getLoginUser } from '../../api/user'
import MD5 from 'js-md5'
import Lockr from "lockr"
import Cookies from 'js-cookie'
import { getToken } from "../../utils/auth"
import getLanguage from '../../utils/sysLanguage'
export default {
    data() {
        var validateNumLetter = (rule,value,callback) => {
            if(!/^[A-Za-z0-9]+$/i.test(value)){
                callback(new Error('请输入数字加字母！'));
            }else {
                callback();
            }
        };
        return {
            authCodeSrc: '',
            loginForm: {
                username: '',
                upassword: '',
                authCode: ''
            },
            loginRules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { validator: validateNumLetter , trigger:'onchange'}
                ],
                upassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
                authCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            }
        }
    },

    computed: {
        MD5password() {
            return MD5(this.loginForm.upassword)
        }
    },

    created() {

        this.getOSLanguage();
        this.getLoginUserInfo();
        this.getAuthCode();

    },

    methods: {

        getAuthCode() {
            axios.get('/coron-web/getPicValidateCode', {}).then(res => {
                this.authCodeSrc = res.data.imgData;
            })
        },

        getOSLanguage(){
            var language = getLanguage();
            console.log("当前浏览器语言是：",language);
            Lockr.set("LANGUAGE", language);
        },

        handleLogin() {

            const data = {
                uname: this.loginForm.username,
                upassword: MD5(this.MD5password + this.loginForm.authCode),
                captcha: this.loginForm.authCode
            };

            this.$refs.loginForm.validate(valid => {
                
                if (valid) {

                    $http.post('/coron-web/login', data).then(res => {
                        console.log(res);
                        if (res.status) {                            
                            Cookies.set('Token', res.entry);
                            this.getLoginUserInfo();
                            this.$router.push({ path: '/dashboard' })
                        } else {
                            this.$message.error(res.cnMessage);
                        }

                    })

                } else {
                    console.log("error commit");
                    this.$message({
                        type:'error',
                        message:'校验失败，请检查'
                    })
                    return false;
                }
            })

        },

        getLoginUserInfo() {
            getLoginUser().then(res => {

                if (res.status) {
                    Lockr.set("USERINFO", res.entry);
                    Cookies.set('_UNAME', res.entry.uname);
                    
                    if(res.entry.userType == 3 || res.entry.userType == 4){                        
                        console.log("店铺级别账号：",res.entry.shop);
                        Cookies.set('SHOPLANGUAGE', res.entry.shop.language);
                        Lockr.set("SHOPLANGUAGE", res.entry.shop.language);
                    }

                    console.log("用户登录信息",res);
                    if (getToken()) {
                        this.$router.push({
                            path: '/dashboard'
                        })
                    } else {
                        return false;
                    }

                }

            })
        }
    }
}
</script>

<style>
.login-container {
    position: relative;
    width: 100%;
    height: 100%;    
}

.login-container .login-title {
    height: 70px;
    line-height: 70px;
    padding-left: 30px;
    border-bottom: solid 1px #fff;
    background: rgba(44,48,52,.95);
}

.login-container .login-title span {
    color: #fff;
    font-size: 24px;
    font-weight: 300;
}

.login-container .login-middle {
    min-height: 600px;
    min-width: 1000px;
    max-width: 1200px;
    margin: 0 auto;
    background: #fff url('/coron-web/bigc/static/images/login-robotbg.png') no-repeat;
    background-size: contain;
}

.login-container .svg-container {
    width: 57px;
    height: 54px;
    line-height: 54px;
    display: inline-block;
    text-align: center;
    background-color: #00a2ca;
}

.login-container .login-form {
    width: 250px;
    padding:10px 20px;
    background-color: #fff;    
    margin-top: 80px;
    border: 1px solid #D4D4D4;
    position: absolute;
    right: 160px;
    z-index: 2;
}

.login-container .login-form .el-form-item {
    margin-bottom: 10px;
}

.login-container .form-title {
    text-align: center;
    font-size: 24px;
    font-weight: 400;
}

.login-container input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
}

.login-container .login-form .login-input {
    width: 100%;
}

.login-container .login-form .authCode-input {
    width: 50%;
}

.login-container .login-form p{    
    margin: 0;
    font-weight: 700;
}

.login-container .login-input .el-input__inner {
    line-height: 16px;
    padding: 8px 5px;
    background: transparent;
}

.login-container .authCode-input .el-input__inner {    
    line-height: 16px;
    padding: 8px 5px;
    background: transparent;    
}

.login-container .authCode-Form {
    margin-top: 20px;
}

.login-container .authCodeImg {
    height: 36px;
}

.login-container .loginBtn {
    color: #fff;
    width: 100%;
    height: 36px;
    font-size: 14px;
    font-weight: 700;
    background-color: #00a2ca;
    outline: none;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
}
.login-container .loginBtn:hover {
    color: #fff;
    outline: none;
}

.login-container .login-footer {
    height: 98px;
    line-height: 98px;
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #4B5054;
}
.login-container .login-footer p {
    padding:0;
    margin: 0;
    color: #fff;
}

.login-container .login-footer .footer-us,
.login-container .login-footer .footer-web {
    color:rgba(255,255,255,.69);
}
</style>