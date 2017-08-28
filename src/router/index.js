import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/common/Home";
import DashBoard from "@/components/page/DashBoard";
import Products from "@/components/page/Products";
import shopTimeDuration from "@/components/page/shopTimeDuration";
import tasteManage from "@/components/page/tasteManage";
import typeManage from "@/components/page/typeManage";
import introduce from "@/components/page/introduce";
import operation from "@/components/operation/operation";

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
          meta: ["商品管理", "商品列表"]
        },
        {
          path: "/shoptimeduration",
          component: shopTimeDuration,
          meta: ["时段管理", "时段列表"]
        },
        {
          path: "/tastemanage",
          component: tasteManage,
          meta: ["属性管理", "属性列表"]
        },
        {
          path: "/typemanage",
          component: typeManage,
          meta: ["目录管理", "目录列表"]
        },
        {
          path: "/introduce",
          component: introduce,
          meta: ["提案管理", "提案列表"]
        },
        {
          path: "/operation",
          component: operation,
          meta: ["运营管理", "店铺管理"]
        },
        // catch all redirect
        { path: "*", redirect: "/dashboard" }
      ]
    }
  ]
});
