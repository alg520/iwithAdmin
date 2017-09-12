import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/common/Home";
import Login from "@/components/login/login";

import DashBoard from "@/components/page/DashBoard";
import Products from "@/components/page/Products";

import Introduce from "@/components/page/introduce";

import Shop from "@/components/page/shop";
import Shopinfo from "@/components/shop/info";
import Shoporder from "@/components/shop/order";
import Orderdetail from "@/components/shop/orderDetail";

import Operation from "@/components/operation/operation";
import Shopmanage from "@/components/operation/shopmanage";
import Ordermanage from "@/components/operation/ordermanage";
import Addshop from "@/components/operation/addShop";
import Updateshop from "@/components/operation/updateShop";
import Shopdetail from "@/components/operation/shopdetail";


import ItemList from "@/components/products/list/itemList";
import AddList from "@/components/products/list/addList";
import UpdateList from "@/components/products/list/updateList";
import SortList from "@/components/products/list/sortList";
import Catalog from "@/components/products/catalog/catalogList";
import AttrList from "@/components/products/attr/attrList";
import TimeDuration from "@/components/products/time/timeList";

Vue.use(Router);


const router = new Router({
  mode: "history",
  base: __dirname,
  //base:'/coron-web',
  routes: [
    {
      path: "/",
      component: Home,
      meta:{
        requireAuth:true
      },
      children: [
        {
          path: "",
          component: DashBoard,
          meta:{
            requireAuth:true
          },
        },
        {
          path: "/dashboard",
          component: DashBoard,
          meta:{
            requireAuth:true
          },
        },
        {
          path: "/products",
          component: Products,
          redirect: "/products/list",
          meta: ["商品管理", "商品列表"],
          meta:{
            requireAuth:true,
            breadNav:[
              {name:'商品管理',path:''},
              {name:'商品列表',path:''}
            ]
          },
          children: [
            { path: "list", component: ItemList },
            { path: "add", component: AddList },
            { path: "update", component: UpdateList },
            { path: "sort", component: SortList },
            { path: "catalog", component: Catalog },
            { path: "timeduration", component: TimeDuration },
            { path: "attrlist", component: AttrList }
          ]
        },
        {
          path: "/introduce",
          component: Introduce,
          meta: ["提案管理", "提案列表"],
          meta:{
            requireAuth:true,
            breadNav:[
              {name:'提案管理',path:''},
              {name:'提案列表',path:''}
            ]
          },
        },
        {
          path: "/operation",
          component: Operation,          
          redirect: "/operation/shopmanage",
          children: [
            { 
              path: "shopmanage", 
              component: Shopmanage, 
              meta: ["运营管理", "店铺管理"],
              meta:{
                requireAuth:true,
                breadNav:[
                  {name:'运营管理',path:''},
                  {name:'店铺管理',path:''}
                ]
              },
            },
            { 
              path: "addshop", 
              component: Addshop, 
              meta: ["运营管理", "店铺管理", "店铺添加"],
              meta:{
                requireAuth:true,
                breadNav:[
                  {name:'运营管理',path:''},
                  {name:'店铺管理',path:''},
                  {name:'店铺添加',path:''}
                ]
              },
            },
            { 
              path: "updateshop", 
              component: Updateshop, 
              meta: ["运营管理", "店铺管理", "店铺修改"],
              meta:{
                requireAuth:true,
                breadNav:[
                  {name:'运营管理',path:''},
                  {name:'店铺管理',path:''},
                  {name:'店铺修改',path:''}
                ]
              },
            },
            { 
              path: "shopdetail",
              name: "shopdetail", 
              component: Shopdetail, 
              meta: ["运营管理", " 店铺详情"],
              meta:{
                requireAuth:true,
                breadNav:[
                  {name:'运营管理',path:''},
                  {name:'店铺详情',path:''}                 
                ]
              },
            },
            { 
              path: "ordermanage", 
              component: Ordermanage, 
              meta: ["运营管理", "订单管理"],
              meta:{
                requireAuth:true,
                breadNav:[
                  {name:'运营管理',path:''},
                  {name:'订单管理',path:''}                 
                ]
              },
            }
          ]
        },
        {
          path: "/shop",
          component: Shop,
          redirect: "/shop/info",
          children: [
            { 
              path: "info", 
              component: Shopinfo, 
              meta: ["商家管理", "信息管理"],
              meta:{
                requireAuth:true,
                breadNav:[
                  {name:'商家管理',path:''},
                  {name:'信息管理',path:''}                 
                ]
              },
            },
            { 
              path: "order", 
              component: Shoporder, 
              meta: ["商家管理", "订单管理"],
              meta:{
                requireAuth:true,
                breadNav:[
                  {name:'商家管理',path:''},
                  {name:'订单管理',path:''}                 
                ]
              },
            },
            { 
              path: "orderdetail", 
              component: Orderdetail, 
              meta: ["商家管理", "订单管理","订单详情"],
              meta:{
                requireAuth:true,
                breadNav:[
                  {name:'商家管理',path:''},
                  {name:'订单管理',path:''},
                  {name:'订单详情',path:''}                 
                ]
              },
              
            }
          ]
        }
      ]
    },
    {
      path: "/loginIn",
      component: Login
    },
    // catch all redirect
    { path: "*", redirect: "/dashboard" }
  ]
});


export default router;
