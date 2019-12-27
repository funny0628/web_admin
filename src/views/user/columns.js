export default function() {
  return [
    {
      title: "用户头像",
      align: "center",
      key: "uin",
      minWidth: 90,
      render(h, { row }) {
        const baseUrl = "https://cooing.oss-cn-beijing.aliyuncs.com/";
        const imgUrl = `${baseUrl}${row.small_icon}`;
        if (row.small_icon) {
          return <img src={imgUrl} style={{ display: "block", width: "50px", margin: "10px 0" }} />;
        }
        return <span>-</span>;
      }
    },
    {
      title: "用户ID",
      align: "center",
      key: "uin",
      minWidth: 90
    },
    {
      title: "用户昵称",
      align: "center",
      key: "nick_name",
      minWidth: 90
    },
    {
      title: "国际区号",
      align: "center",
      key: "lang_code",
      minWidth: 90
    },
    {
      title: "手机",
      align: "center",
      key: "phone_number",
      minWidth: 120
    },
    {
      title: "性别",
      align: "center",
      key: "gender",
      minWidth: 80,
      render(h, { row }) {
        const value = {
          0: "-",
          1: "男",
          2: "女"
        }[row.gender];
        return <span>{value}</span>;
      }
    },
    {
      title: "注册渠道",
      align: "center",
      key: "account",
      minWidth: 90,
      render(h, { row }) {
        const value = {
          1: "IOS",
          2: "安卓",
          3: "web",
          4: "后台"
        }[row.device_type];
        return <span>{value}</span>;
      }
    },
    {
      title: "注册时间",
      align: "center",
      key: "create_at",
      minWidth: 160,
      render: (h, { row }) => {
        if (!row.create_at) {
          return <span>-</span>;
        }
        const value = this.$dayjs(new Date(row.create_at * 1000)).format("YYYY-MM-DD HH:mm:ss");
        return <span>{value}</span>;
      }
    },
    {
      title: "注册IP",
      align: "center",
      key: "create_ip",
      minWidth: 80,
      render: (h, { row }) => {
        return <span>{row.create_ip ? row.create_ip : "-"}</span>;
      }
    },
    {
      title: "最后在线时间",
      align: "center",
      key: "last_login_at",
      minWidth: 160,
      render: (h, { row }) => {
        if (!row.last_login_at) {
          return <span>-</span>;
        }
        const value = this.$dayjs(new Date(row.last_login_at * 1000)).format("YYYY-MM-DD HH:mm:ss");
        return <span>{value}</span>;
      }
    },
    {
      title: "最后在线IP",
      align: "center",
      key: "last_online_ip",
      minWidth: 100,
      render(h, { row }) {
        return <span>{Number(row.last_online_ip) === 0 ? "-" : row.last_online_ip}</span>;
      }
    },
    {
      title: "账号状态",
      align: "center",
      key: "account",
      minWidth: 100,
      render(h, { row }) {
        const value = {
          1: "停用",
          0: "启用"
        }[row.state];
        return <span style={{ color: row.state === 1 ? "#f33" : "#39f" }}>{value}</span>;
      }
    },
    {
      title: "操作",
      align: "center",
      key: "account",
      minWidth: 200,
      render: (h, { row }) => {
        const { state } = row;
        return (
          <div class="handle-box">
            {state === 0 ? (
              <Button type="error" size="small" onClick={() => this.toggleUserStatus(1, row)}>
                停用
              </Button>
            ) : (
              <Button type="primary" size="small" onClick={() => this.toggleUserStatus(0, row)}>
                启用
              </Button>
            )}
            <Button
              size="small"
              onClick={() => {
                this.resetPassword(row.uin);
              }}
            >
              重置密码
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                this.changePhoneNum(row.uin);
              }}
            >
              修改手机
            </Button>
          </div>
        );
      }
    }
  ];
}
