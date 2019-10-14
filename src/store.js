import Vue from "vue";
import Vuex from "vuex";
import user from "./store/user";
import loading from "./store/loading";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    loading
  },
  plugins: [createPersistedState()]
});
