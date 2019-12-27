import Vue from "vue";
import Router from "vue-router";
import iView from "iview";
import routes from "./routes";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    ...routes,
    { path: "/", redirect: "user/list" },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login")
    },
    {
      path: "*",
      name: "error_404",
      component: () => import("@/views/error-page/404.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  const { name } = to;

  // 未登录跳到登录页.
  // const unLogin = !window.localStorage.getItem("token");
  // if (name !== "login" && unLogin) {
  //   iView.Message.error("请先登录");
  //   next("/login");
  // } else {
  //   next();
  // }
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
export default router;
