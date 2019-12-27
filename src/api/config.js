const tempHost = window.location.host;
export default {
  // 开发环境
  development: {
    // host: "10.99.50.40:8888"
    host: "47.91.228.223:8090"
  },
  // 生产环境
  production: {
    // eslint-disable-next-line
    // host: VUE_APP_API
    host: "47.97.62.38:6090"
    // host: "api.domaincheckcheck.top:3389/api/v1"
  }
}[process.env.NODE_ENV];
