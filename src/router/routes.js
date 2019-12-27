import Main from "@/components/main";

const routes = [
  {
    path: "/user",
    name: "user",
    component: Main,
    meta: {
      title: "用户管理",
      icon: "ios-paper-outline"
    },
    children: [
      {
        path: "list",
        name: "user_list",
        meta: {
          title: "用户列表",
          icon: "ios-paper-outline"
        },
        component: () => import("@/views/user/user")
      }
    ]
  },
  {
    path: "/report",
    name: "report",
    component: Main,
    meta: {
      title: "报表",
      icon: "ios-paper-outline"
    },
    children: [
      {
        path: "detail",
        name: "report_detail",
        meta: {
          title: "数据报表",
          icon: "ios-paper-outline"
        },
        component: () => import("@/views/report/report")
      }
    ]
  }
];
export default routes;
