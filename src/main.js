import Vue from "vue";
import iView from "iview";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import App from "./App.vue";
import router from "@/router/index";
import store from "./store";
import Http from "@/api/http";
import ApiList from "@/api/apiList";
import "iview/dist/styles/iview.css";
import "./assets/reset.less";

dayjs.extend(isBetween);
Vue.use(iView);
Vue.config.productionTip = false;
Vue.prototype.$Http = Http;
Vue.prototype.$ApiList = ApiList;
Vue.prototype.$dayjs = dayjs;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
