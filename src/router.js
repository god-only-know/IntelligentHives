import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/Layout/Index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "",
          redirect: "home"
        },
        {
          path: "home",
          name: "home",
          component: () => import("@/views/Home/Index.vue"),
          meta: {
            title: "蜂箱管理系统"
          }
        },
        {
          path: "detail",
          name: "detail",
          component: () => import("@/views/Detail/Index.vue"),
          meta: {
            title: "蜂箱详情"
          }
        },
        {
          path: "user",
          name: "user",
          component: () => import("@/views/User/Index.vue"),
          meta: {
            title: "用户界面"
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login/Index.vue"),
      meta: {
        title: "登录"
      }
    }
  ]
});
