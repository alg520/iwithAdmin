// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Lockr from 'lockr'
import VueCookie from 'vue-cookie';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
//引入element-ui的默认CSS样式
import 'element-ui/lib/theme-default/index.css';
//引入项目中自定义过滤器
import * as filters from './filters/index';


Vue.use(ElementUI);
Vue.use(VueCookie);

Vue.config.productionTip = false;

//Register global utility filters
Object.keys(filters).forEach(key => {
  console.log("注册全局过滤器",key);
  Vue.filter(key,filters[key])
})

//路由的钩子函数  控制当前的权限
router.beforeEach((to,from,next) => {
  
  console.log(to);
    
  let token = true;

  if(to.meta.requireAuth){
    if(token){
      next()
    } else {
      next({
        path:'/loginIn',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }


})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate:function(){
    console.log('beforeCreated.....');    
    Lockr.set("username",'zhangpengbin');        

    console.log("cookie",this.$cookie.get('VT'));
    
  }
})
