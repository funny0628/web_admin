import axios from "axios";
import iView from "iview";
import setting from "./config";
import { queryStringify } from "@/utils";

const protocol = `${window.location.protocol}//`;

const { CancelToken } = axios;
const source = CancelToken.source();
axios.defaults.baseURL = protocol + setting.host;
// 设置token
function setToken(config) {
  // const token = window.localStorage.getItem("token");
  // if (token) {
  //   return Object.assign(config, {
  //     headers: {
  //       token: `${token}`
  //     }
  //   });
  // }
  return config;
}
// 请求拦截
axios.interceptors.request.use(
  function(config) {
    return setToken(config);
  },
  function(error) {
    console.log(error);
    return Promise.reject(error);
  }
);
// 响应拦截
axios.interceptors.response.use(
  function(response) {
    if (response && response.data && response.data.code !== 200) {
      iView.Message.error(response.data.msg);
      return Promise.reject(response.data.msg);
    }
    return response.data;
  },
  function(error) {
    // 401 token失效
    if (error.response) {
      if (error.response.status === 401) {
        iView.Message.error({
          content: "登录信息过期,请重新登录",
          onClose() {
            window.localStorage.removeItem("username", "");
            window.location.href = "/login";
          }
        });
      } else if (error.response.status >= 500) {
        // 服务器错误:错误提示,客户端错误:警告提示
        iView.Message.error("服务器错误");
      }
      return Promise.reject(error.response.statusText);
    }
    if (error.message) {
      return Promise.reject(error.message);
    }
    if (error.request) {
      return Promise.reject(error.request.responseText);
    }
    return Promise.reject(error);
  }
);

function request(type, url, data = {}) {
  return axios({
    headers: {
      "content-type": "application/json"
    },
    method: type,
    url,
    data,
    cancelToken: source.token,
    withCredentials: true
  });
}
const Http = {
  async get(url, query) {
    return await axios.get(`${url}${queryStringify(query)}`, {
      cancelToken: source.token,
      withCredentials: true
    });
  },
  async post(url, params) {
    return await request("post", url, params);
  },
  async put(url, params) {
    return await request("put", url, params);
  },
  async patch(url, params) {
    return await request("patch", url, params);
  },
  async delete(url) {
    return await request("delete", url);
  }
};
export default Http;
