// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import $ from "jquery";
import App from "./App";
import Lockr from "lockr";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
//引入element-ui的默认CSS样式
import "element-ui/lib/theme-default/index.css";
//引入项目中自定义过滤器
import * as filters from "./filters/index";
import getHost from "./utils/getHost";



Vue.use(ElementUI);

Vue.prototype.$ = $;


Vue.config.productionTip = false;

//Register global utility filters
Object.keys(filters).forEach(key => {
  //console.log("注册全局过滤器", key);
  Vue.filter(key, filters[key]);
});

// import ElementLocale from 'element-ui/lib/locale'
import i18n from './i18n';
import {LANGS} from '@/i18n/lang';

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App },
  beforeCreate: function() {    
    console.log("beforeCreated.....");
    // if(process.env.NODE_ENV !== 'development'){
    //   getHost();
    // }
  },
  created() {    
    console.log("created .......");
  }
});
