export default {
  state: {
    token: ""
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    CLEAR_TOKEN(state) {
      state.token = "";
    }
  },
  getters: {
    GET_TOKEN(state) {
      return state.token || "";
    }
  }
};
