<template>
  <div class="login-form">
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
      <FormItem prop="userName">
        <Input
          v-model="form.userName"
          placeholder="请输入用户名"
          :class="[focusState === 'username' && 'focus-area']"
          @on-focus="toggleFocusState('username')"
          @on-blur="toggleFocusState(0)"
        >
          <span slot="prepend">
            <Icon :size="16" type="ios-person"></Icon>
          </span>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input
          :type="passType === 'close' ? `password` : `text`"
          :maxlength="10"
          v-model="form.password"
          placeholder="请输入密码"
          :class="[focusState === 'password' && 'focus-area']"
          @on-focus="toggleFocusState('password')"
          @on-blur="toggleFocusState(0)"
        >
          <span slot="prepend">
            <Icon :size="14" type="md-lock"></Icon>
          </span>

          <span slot="append" @click="passType = 'open'" v-if="passType === 'close'">
            <Icon type="md-eye-off" :size="14" />
          </span>
          <span slot="append" @click="passType = 'close'" v-if="passType === 'open'">
            <Icon type="md-eye" :size="14" />
          </span>
        </Input>
      </FormItem>
      <FormItem prop="authcode">
        <Input
          class="authcode"
          v-model="form.authcode"
          placeholder="请输入验证码"
          :class="[focusState === 'code' && 'focus-area']"
          @on-focus="toggleFocusState('code')"
          @on-blur="toggleFocusState(0)"
        >
          <div slot="append">
            <div class="authcodeBox">
              <Spin fix v-if="loadingCodeImage"></Spin>
              <div class="con" @click="getAuthCode">
                <img v-if="authcode.image" :src="authcode.image" />
                <span v-else>点击获取验证码</span>
              </div>
            </div>
          </div>
        </Input>
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit" type="primary" long :loading="loading">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "LoginForm",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    },
    authcodeRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "验证码不能为空", trigger: "blur" }];
      }
    }
  },
  data() {
    return {
      focusState: 0,
      form: {
        userName: "",
        password: "",
        authcode: ""
        // authToken: ""
      },
      loadingCodeImage: false,
      // 验证码
      authcode: {
        image: ""
      },
      passType: "close"
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        authcode: this.authcodeRules
      };
    }
  },
  methods: {
    toggleFocusState(status) {
      this.focusState = status;
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit("on-success-valid", {
            loginName: this.form.userName,
            loginPwd: this.form.password,
            vercode: this.form.authcode
            // key: this.form.authToken
          });
        }
      });
    },
    // 获取验证码
    async getAuthCode() {
      this.loadingCodeImage = true;
      this.$Http
        .get(this.$ApiList.getImageCode)
        .then(res => {
          this.$set(this.authcode, "image", res.data);
        })
        .finally(() => {
          this.loadingCodeImage = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.authcode {
  /deep/.ivu-input-group-append {
    padding: 0;
    overflow: hidden;
    position: relative;
    height: 100%;
    .authcodeBox {
      height: 100%;
    }
    .con {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        height: 26px;
        display: block;
        cursor: pointer;
      }
    }

    span {
      cursor: pointer;
      // padding: 0 4px;
    }
    .authcodeBox {
      // position: relative;
    }
  }
}
</style>
