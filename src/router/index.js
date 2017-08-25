import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/common/Home';
import DashBoard from '@/components/page/DashBoard';
import Products from '@/components/page/Products';
import shopTimeDuration from '@/components/page/shopTimeDuration';
import tasteManage from '@/components/page/tasteManage';
import typeManage from '@/components/page/typeManage';
import introduce from '@/components/page/introduce';
//import login from '@/components/login/login';

Vue.use(Router)

export default new Router({
  mode:'history',
  base:__dirname,
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path:'',
          component:DashBoard
        },{
          path:'/DashBoard',
          component:DashBoard
        },{
          path:'/Products',
          component:Products,
          meta: ['商品管理', '商品列表'],
        },{
          path:'/shopTimeDuration',
          component:shopTimeDuration,
          meta: ['时段管理', '时段列表']
        },{
          path:'/tasteManage',
          component:tasteManage,
          meta: ['属性管理', '属性列表']
        } ,{
          path:'/typeManage',
          component:typeManage,
          meta: ['目录管理', '目录列表']
        },{
          path:'/introduce',
          component:introduce,
          meta: ['提案管理', '提案列表']
        }
        // {
        //   path:'/login',
        //   component:login
        // }
      ]
    }
  ]
})
