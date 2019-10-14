import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import API from "./api/index";
import "./registerServiceWorker";
import VueAreaLinkage from "vue-area-linkage";
import "vue-area-linkage/dist/index.css";
import "./utils/date";
Vue.config.productionTip = false;
import VCharts from "v-charts";
Vue.use(VCharts);
Vue.use(ElementUI);
Vue.use(VueAreaLinkage);

Vue.prototype.$API = API;
router.beforeEach((to, form, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
