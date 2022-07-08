import Vue from "vue";
import Vuex from "vuex";
import { getLocal, setLocal } from "@/utils/storage";

Vue.use(Vuex);
// const tokenKey = "toutiao_token";

export default new Vuex.Store({
  state: {
    user: getLocal("toutiao_token")
    // user: null
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
      // localStorage.setItem("toutiao_token", JSON.stringify(user));
      setLocal("toutiao_token",user)
    }
  },
  actions: {},
  modules: {}
});
