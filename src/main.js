import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/style/index.less";
import ToutiaoIcon from "@/components/ToutiaoIcon.vue";
import vant from "vant";
import "vant/lib/index.less";
import "amfe-flexible";


// import request from "@/utils/request";
// request.get("/v1_0/channels").then((res) => {
//   console.log(res);
// });

Vue.use(vant);
Vue.component("ToutiaoIcon", ToutiaoIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
