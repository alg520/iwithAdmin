import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/common/Home';
import DashBoard from '@/components/page/DashBoard';
import AmCharts from '@/components/page/BasicCharts';
import FormInput from '@/components/page/FormInput';
import FormLayouts from '@/components/page/FormLayouts';
import BasicTables from '@/components/page/BasicTables';
import EditorPage from '@/components/page/EditorPage';
import MarkdownPage from '@/components/page/MarkdownPage';
import Products from '@/components/page/Products';
import shopTimeDuration from '@/components/page/shopTimeDuration';
import tasteManage from '@/components/page/tasteManage';
import typeManage from '@/components/page/typeManage';
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
          path:'/EditorPage',
          component:EditorPage
        },{
          path:'/MarkdownPage',
          component:MarkdownPage
        },{
          path:'/BasicCharts',
          component:AmCharts
        },{
          path:'/FormInput',
          component:FormInput
        },{
          path:'/FormLayouts',
          component:FormLayouts
        },{
          path:'/BasicTables',
          component:BasicTables
        },{
          path:'/Products',
          component:Products,
          meta: ['商品管理', '商品列表'],
        },{
          path:'/shopTimeDuration',
          component:shopTimeDuration
        },{
          path:'/tasteManage',
          component:tasteManage
        } ,{
          path:'/typeManage',
          component:typeManage
        }, 
        // {
        //   path:'/login',
        //   component:login
        // }
      ]
    }
  ]
})
