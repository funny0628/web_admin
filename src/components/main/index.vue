<template>
  <div class="main">
    <Layout class="main-layout">
      <Header :style="{ zIndex: 1 }">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">COOINGADMIN</div>
          <!-- <Breadcrumb class="header-nav">
            <Breadcrumb-item v-for="(item, i) in navMenu" :key="i">{{
              item.title
            }}</Breadcrumb-item>
          </Breadcrumb> -->
          <Dropdown class="user">
            {{ username }}
            <Icon type="ios-arrow-down"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="logout">退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger class="sider-menu">
          <!-- 菜单列表 -->
          <Menu
            :active-name="activeMenu"
            theme="dark"
            width="auto"
            :open-names="openMenu"
            @on-select="selectMenu"
          >
            <!-- 二级菜单 -->
            <Submenu v-for="(item, i) in routes" :key="i" :name="i" v-if="item.children.length > 1">
              <template slot="title">
                <Icon :type="item.meta.icon" />
                {{ item.meta.title }}
              </template>
              <MenuItem
                v-for="(childItem, childIndex) in item.children"
                :name="`${i}-${childIndex}`"
                :key="childIndex"
                @click.native="linkMenu(item, childItem)"
                >{{ childItem.meta.title }}</MenuItem
              >
            </Submenu>
            <!-- 无二级菜单 -->
            <MenuItem
              v-else
              :name="`${i}-0`"
              :key="i"
              @click.native="linkMenu(item, item.children[0])"
            >
              <Icon :type="item.children[0].meta.icon" />
              {{ item.children[0].meta.title }}
            </MenuItem>
          </Menu>
        </Sider>
        <Layout class="layout-content">
          <!-- router-view -->
          <Content class="layout-content-box" style="position: relative;">
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import ROUTES from "@/router/routes";
import { removeLocal } from "@/utils/index";

export default {
  name: "Main",
  data() {
    return {
      routes: ROUTES,
      // 默认打开的菜单
      openMenu: [0, 1],
      // 当前菜单
      menuIndex: 0
    };
  },
  computed: {
    // 用户名
    username() {
      return window.localStorage.getItem("username");
    },
    // 当前菜单
    activeMenu() {
      let res;
      ROUTES.map((item, key) => {
        item.children &&
          item.children.map((childItem, childKey) => {
            childItem.name === this.$route.name && (res = `${key}-${childKey}`);
          });
      });
      return res;
    }
  },
  methods: {
    // 跳转菜单
    linkMenu(item, child) {
      // https://github.com/vuejs/vue-router/issues/2872
      this.$router.push(`${item.path}/${child.path}`, () => {});
    },
    // 退出登录
    logout() {
      this.$Http.post(this.$ApiList.logout, {}).then(res => {
        if (res.code === 200) {
          removeLocal("username");
          this.$router.push("/login");
        }
      });
    },
    // 选择菜单
    selectMenu(index) {
      this.menuIndex = index;
      console.log(index);
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./index.less");

.sider-menu {
  user-select: none;
}
</style>
