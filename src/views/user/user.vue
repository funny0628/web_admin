<template>
  <div id="user">
    <!-- 添加用户modal -->
    <Modal v-model="newUserModal" title="添加用户" footer-hide>
      <div class="mb10">
        <span>*用户昵称 : </span>
        <Input
          v-model.trim="newUser.userName"
          placeholder="1-10位"
          style="width: 200px"
          :maxlength="10"
        />
      </div>
      <div class="mb10">
        <span>*国际区号 : </span>
        <Select v-model="newUser.langCode" style="width:200px">
          <Option v-for="(item, index) in areaCodeList" :value="item.id" :key="index">
            {{ item.label }}
          </Option>
        </Select>
      </div>
      <div class="mb10">
        <span>*手机号码 : </span>
        <Input
          v-model.trim="newUser.phoneNumber"
          placeholder="6-11位"
          style="width: 200px"
          :maxlength="11"
        />
      </div>
      <div class="mb10">
        <span>*登录密码 : </span>
        <Input
          v-model.trim="newUser.pwd"
          type="password"
          placeholder="6-15位"
          style="width: 200px"
          :maxlength="15"
        />
      </div>
      <div class="mb10">
        <span>*确定密码 : </span>
        <Input
          v-model.trim="newUser.repwd"
          type="password"
          placeholder="6-15位"
          style="width: 200px"
          :maxlength="15"
        />
      </div>
      <div>
        <Button type="primary" class="mr5" @click="newUserHandle">
          确认
        </Button>
        <Button @click="newUserModal = false">
          取消
        </Button>
      </div>
    </Modal>
    <!-- 重置密码modal -->
    <Modal v-model="changePwdModal" title="重置密码" footer-hide>
      <div class="mb10">
        <span>*输入密码 : </span>
        <Input
          v-model.trim="password"
          placeholder="请输入6-15位密码"
          style="width: 160px"
          type="password"
          :maxlength="15"
        />
      </div>
      <div class="mb10">
        <span>*确定密码 : </span>
        <Input
          v-model.trim="confirmPwd"
          placeholder="请再次输入密码"
          style="width: 160px"
          type="password"
          :maxlength="15"
        />
      </div>
      <div>
        <Button type="primary" class="mr5" @click="resetPsHandle">
          确认
        </Button>
        <Button @click="changePwdModal = false">
          取消
        </Button>
      </div>
    </Modal>
    <!-- 修改手机modal -->
    <Modal v-model="changePhoneNumModal" title="修改手机" footer-hide>
      <div class="mb10">
        <span>*国际区号 : </span>
        <Select v-model="langCode" style="width:230px">
          <Option v-for="(item, index) in areaCodeList" :value="item.id" :key="index">
            {{ item.label }}
          </Option>
        </Select>
      </div>
      <div class="mb10">
        <span>*手机号码 : </span>
        <Input
          v-model.trim="phoneNum"
          placeholder="请输入手机号码"
          style="width: 160px"
          :maxlength="11"
        />
      </div>
      <div>
        <Button type="primary" class="mr5" @click="changePhoneNumHandle">
          确认
        </Button>
        <Button @click="changePhoneNumModal = false">
          取消
        </Button>
      </div>
    </Modal>
    <Card>
      <div class="head">
        <div>
          <span>用户ID:</span>
          <Input v-model.trim="query.uin" placeholder="请输入用户ID" style="width: 180px" />
        </div>
        <div>
          <span>用户昵称:</span>
          <Input v-model.trim="query.nick_name" placeholder="请输入用户昵称" style="width: 180px" />
        </div>
        <div>
          <span>手机号码:</span>
          <Input
            v-model.trim="query.phone_number"
            placeholder="请输入用户手机"
            style="width: 180px"
          />
        </div>
        <div>
          <span>国家区号:</span>
          <Select v-model="query.lang_code" style="width:230px">
            <Option v-for="(item, index) in areaCodeList" :value="item.id" :key="index">
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div>
          <span>注册渠道:</span>
          <Select v-model="query.device_type" style="width:180px">
            <Option v-for="item in channelList" :value="item.id" :key="item.id">
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div>
          <span>注册日期:</span>
          <DatePicker
            v-model="query.dateValue"
            type="datetimerange"
            placement="bottom-end"
            placeholder="Select date"
            style="width: 350px"
            :options="dataOptions"
            format="yyyy-MM-dd HH:mm:ss"
          ></DatePicker>
        </div>
        <div>
          <Button type="primary" @click="search">查询</Button>
          <Button style="margin-left:10px" @click="reset">重置</Button>
        </div>
      </div>
    </Card>
    <list-page
      :columns="columns"
      :data="data.data"
      :loading="loading"
      @get-list="getList"
      :page="page"
      style="margin-top:10px"
    >
      <div class="info" slot="info">
        <div>
          今日新增<span>{{ userTotal.today }}</span
          >个用户,昨日新增<span>{{ userTotal.yesterday }}</span
          >个用户,累计共<span>{{ userTotal.total }}</span
          >个用户
        </div>
        <div>
          <Button type="primary" @click="newUserModal = true">新增用户</Button>
        </div>
      </div>
    </list-page>
  </div>
</template>

<script>
import listPage from "_c/listPage";
import { SHA256 } from "crypto-js";
import columns from "./columns";

const initPage = {
  total: 0,
  page: 1,
  pagesize: 30
};
const initQuery = {
  uin: "",
  lang_code: 0,
  dateValue: "",
  device_type: "",
  nick_name: "",
  phone_number: ""
};
const initNewUser = {
  userName: "",
  langCode: "",
  phoneNumber: "",
  pwd: "",
  repwd: ""
};
const initUserTotal = {
  today: 0,
  total: 0,
  yesterday: 0
};
export default {
  name: "user",
  data() {
    return {
      userTotal: JSON.parse(JSON.stringify(initUserTotal)),
      newUser: JSON.parse(JSON.stringify(initNewUser)),
      newUserModal: false,
      langCode: "",
      phoneNum: "",
      changePhoneNumModal: false,
      curUin: "",
      // 修改密码
      password: "",
      confirmPwd: "",
      // 重置密码弹框
      changePwdModal: false,
      page: { ...initPage },
      data: {
        data: []
      },
      columns: [],
      loading: true,
      query: JSON.parse(JSON.stringify(initQuery)),
      dataOptions: {},
      areaCodeList: [],
      // 注册渠道列表
      channelList: [
        {
          label: "Android",
          id: 2
        },
        {
          label: "Ios",
          id: 1
        },
        {
          label: "Web",
          id: 3
        },
        {
          label: "后台添加",
          id: 4
        }
      ]
    };
  },
  components: {
    listPage
  },
  created() {
    this.init();
  },
  methods: {
    // 验证长度
    verifyLength(num, [min, max]) {
      if (num.length < min || num.length > max) {
        return false;
      }
      return true;
    },
    isNoEmpty() {
      const { userName, langCode, phoneNumber, pwd, repwd } = this.newUser;
      if (!userName) {
        this.$Message.warning("请输入昵称");
        return false;
      }
      if (!langCode) {
        this.$Message.warning("请输入区号");
        return false;
      }
      if (!phoneNumber) {
        this.$Message.warning("请输入手机号码");
        return false;
      }
      if (!pwd) {
        this.$Message.warning("请输入登录密码");
        return false;
      }
      if (!repwd) {
        this.$Message.warning("请输入确认密码");
        return false;
      }
      return true;
    },
    // 新增用户
    newUserHandle() {
      if (this.isNoEmpty()) {
        const { userName, langCode, phoneNumber, pwd, repwd } = this.newUser;
        if (!this.verifyLength(userName, [1, 10])) {
          this.$Message.warning("用户昵称长度位1-10位");
        } else if (!this.verifyLength(phoneNumber, [6, 11])) {
          this.$Message.warning("手机号码长度为6-11位");
        } else if (!this.verifyLength(pwd, [6, 15])) {
          this.$Message.warning("密码长度为6-15位");
        } else if (!this.verifyLength(repwd, [6, 15])) {
          this.$Message.warning("密码长度为6-15位");
        } else if (pwd !== repwd) {
          this.$Message.warning("两次密码输入不一致");
        } else {
          this.$Http
            .post(this.$ApiList.addUser, {
              ...this.newUser,
              pwd: SHA256(pwd).toString(),
              repwd: SHA256(repwd).toString()
            })
            .then(res => {
              if (res.code === 200) {
                this.$Message.success(res.msg);
                this.newUserModal = false;
                this.getList(1);
                this.getUserTotal();
              }
            })
            .catch(e => {
              this.$Message.error("添加用户失败");
            });
        }
      }
    },
    // 修改手机
    changePhoneNumHandle() {
      if (!this.verifyLength(this.phoneNum, [6, 11])) {
        this.$Message.warning("手机号码长度为6-11位");
      } else if (!this.langCode) {
        this.$Message.warning("请选择区号");
      } else {
        this.$Http
          .post(this.$ApiList.updatePhone, {
            uin: this.curUin,
            langCode: this.langCode,
            phoneNumber: this.phoneNum
          })
          .then(res => {
            if (res.code === 200) {
              this.$Message.success(res.msg);
              this.changePhoneNumModal = false;
              this.getList();
            }
          })
          .catch(e => {
            this.$Message.error("修改手机失败");
          });
      }
    },
    // 重置密码
    resetPsHandle() {
      if (
        !this.verifyLength(this.password, [6, 15]) ||
        !this.verifyLength(this.confirmPwd, [6, 15])
      ) {
        this.$Message.warning("请输入6-15位密码");
      } else if (this.password !== this.confirmPwd) {
        this.$Message.warning("两次密码输入不一致");
      } else {
        this.$Http
          .post(this.$ApiList.updatePwd, {
            uin: this.curUin,
            pwd: SHA256(this.password).toString(),
            repwd: SHA256(this.confirmPwd).toString()
          })
          .then(res => {
            if (res.code === 200) {
              this.$Message.success(res.msg);
              this.changePwdModal = false;
            }
          })
          .catch(e => {
            this.$Message.error("修改密码失败");
          });
      }
    },
    init() {
      this.columns = columns.call(this);
      this.getLangCode();
      this.getUserTotal();
    },
    getUserTotal() {
      this.$Http.get(this.$ApiList.userTotal).then(res => {
        if (res.code === 200) {
          this.userTotal = Object.assign({}, this.userTotal, res.data);
        }
      });
    },
    formatAreaCodeList(data) {
      const res = [];
      data.map(item => {
        const r = {
          label: `${item[0]}  ${item[2]}`,
          id: item[2]
        };
        res.push(r);
      });
      this.areaCodeList = res;
    },
    getLangCode() {
      this.$Http.get(this.$ApiList.langCode).then(res => {
        this.formatAreaCodeList(res.data);
      });
    },
    formatQuery() {
      const [startDate, endDate] = this.query.dateValue;
      const data = {
        ...this.query,
        stTime: startDate ? new Date(startDate).getTime() / 1000 : "",
        endTime: endDate ? new Date(endDate).getTime() / 1000 : ""
      };
      delete data.dateValue;
      return data;
    },
    async getList(i) {
      i && (this.page.page = i);
      const { page, pagesize } = this.page;
      const data = {
        ...this.formatQuery(),
        page,
        pagesize
      };
      this.loading = true;
      this.$Http
        .get(this.$ApiList.userList, data)
        .then(res => {
          this.loading = false;
          this.$set(this.data, "data", res.data);
          this.page.total = res.total;
        })
        .finally(e => {
          this.loading = false;
        });
    },
    reset() {
      this.query = Object.assign({}, this.query, initQuery);
      this.getList(1);
    },
    search() {
      this.getList(1);
    },
    // 切换用户状态
    toggleUserStatus(state, { nick_name, uin }) {
      const type = state === 0 ? "启用" : "停用";
      this.$Modal.confirm({
        title: "用户操作",
        content: `你确定要${type}:${nick_name}(ID:${uin})吗?`,
        onOk: () => {
          this.$Http
            .post(this.$ApiList.updateStatus, {
              uin,
              state
            })
            .then(res => {
              if (res.code === 200) {
                this.$Message.success(res.msg);
                this.getList();
              }
            })
            .catch(e => {
              this.$Message.error(`${type}失败`);
            });
        }
      });
    },
    // 重置密码
    resetPassword(uin) {
      this.curUin = uin;
      this.changePwdModal = true;
    },
    // 修改手机
    changePhoneNum(uin) {
      this.curUin = uin;
      this.changePhoneNumModal = true;
    }
  },
  watch: {
    newUserModal(value) {
      if (!value) {
        this.newUser = Object.assign({}, this.newUser, initNewUser);
      }
    },
    changePwdModal(value) {
      if (!value) {
        this.password = "";
        this.confirmPwd = "";
      }
    },
    changePhoneNumModal(value) {
      if (!value) {
        this.langCode = "";
        this.phoneNum = "";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mb10 {
  margin-bottom: 10px;
}
.mr5 {
  margin-right: 5px;
}
#user {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div {
      margin: 10px;
      > span {
        padding-right: 5px;
        font-size: 14px;
      }
    }
  }

  /deep/ .handle-box {
    display: flex;
    justify-content: center;
    /deep/ button {
      // width: 60px;
      &:not(:last-child) {
        margin-right: 3px;
      }
    }
  }
  .info {
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    & > div {
      flex: 1;
      text-align: left;
      &:last-child {
        text-align: right;
      }
    }
  }
}
</style>
