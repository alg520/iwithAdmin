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

import Operation from "@/components/operation/operation";
import Shopmanage from "@/components/operation/shopmanage";
import Ordermanage from "@/components/operation/ordermanage";


import ItemList from "@/components/products/list/itemList";
import AddList from "@/components/products/list/addList";
import Catalog from "@/components/products/catalog/catalogList";
import AttrList from "@/components/products/attr/attrList";
import TimeDuration from "@/components/products/time/timeList";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: __dirname,
  //base:'/coron-web',
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "",
          component: DashBoard
        },
        {
          path: "/dashboard",
          component: DashBoard
        },
        {
          path: "/products",
          component: Products,
          redirect: "/products/list",
          meta: ["商品管理", "商品列表"],
          children: [
            { path: "list", component: ItemList },
            { path: "add", component: AddList },
            { path: "catalog", component: Catalog },
            { path: "timeduration", component: TimeDuration },
            { path: "attrlist", component: AttrList }
          ]
        },
        {
          path: "/introduce",
          component: Introduce,
          meta: ["提案管理", "提案列表"]
        },
        {
          path: "/operation",
          component: Operation,          
          redirect: "/operation/shopmanage",
          children: [
            { 
              path: "shopmanage", 
              component: Shopmanage, 
              meta: ["运营管理", " 店铺管理"] 
            },
            { 
              path: "ordermanage", 
              component: Ordermanage, 
              meta: ["运营管理", "订单管理"] 
            }
          ]
        },
        {
          path: "/shop",
          component: Shop,
          redirect: "/shop/info",
          children: [
            { path: "info", component: Shopinfo, meta: ["商家管理", "信息管理"] },
            { path: "order", component: Shoporder, meta: ["商家管理", "订单管理"] }
          ]
        }
      ]
    },
    {
      path: "/login",
      component: Login
    },
    // catch all redirect
    { path: "*", redirect: "/dashboard" }
  ]
});
