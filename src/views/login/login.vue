<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="" :bordered="false">
        <div class="form-con">
          <login-form
            ref="loginForm"
            @on-success-valid="handleSubmit"
            :loading="loading"
          ></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { local } from "_u/index";
import LoginForm from "./login-form";

export default {
  data() {
    return {
      loading: false
    };
  },
  components: {
    LoginForm
  },
  mounted() {
    this.$refs.loginForm.getAuthCode();
  },
  methods: {
    async handleSubmit(userInfo) {
      if (this.loading) return;
      this.loading = true;
      this.$Http
        .post(this.$ApiList.login, userInfo)
        .then(res => {
          local("username", res.data.loginName);
          this.$Notice.success({
            title: res.data.loginName,
            desc: "欢迎回来",
            duration: 2
          });
          this.$router.push("user/list");
        })
        .catch(e => {
          this.$refs.loginForm.getAuthCode();
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less">
@import "./login.less";
</style>
