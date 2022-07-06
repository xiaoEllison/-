import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// const tokenKey = "toutiao_token";

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("toutiao_token", JSON.stringify(user));
    }
  },
  actions: {},
  modules: {}
});
