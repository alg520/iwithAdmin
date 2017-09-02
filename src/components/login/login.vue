<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">       
        <span class="svg-container">
          <i class="iconfont icon-user"></i>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-password"></i>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {    
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' },],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },]
      }      
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {          
          this.$store.dispatch('Login', this.loginForm).then(() => {            
            this.$router.push({ path: '/' })
          }).catch(() => {
            
          })
        } else {
          console.log('error submit!!')
          return false
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
  height: 100vh;
  background-color: #2d3a4b;
}
.login-container input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
}
.login-container input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 8px;
    color: #eee;
    height: 47px;
    width: 260px;
}
.login-container .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
}
.login-container .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
}
.login-container .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 15px;
    display: inline-block;
}
.login-container .svg-container_login {
      font-size: 20px;
}
.login-container .title {
    font-size: 26px;
    font-weight: 400;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
}
.login-container .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 350px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
}
.login-container .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
}
.login-container .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
}
.login-container .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
}
</style>