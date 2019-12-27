const path = require("path");

const resolve = dir => path.join(__dirname, dir);
const BASEURL = process.env.npm_config_API;
const BASETITLE = process.env.npm_config_TITL;

module.exports = {
  // 选项...
  devServer: {
    port: 4397 // 端口
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components"))
      .set("_u", resolve("src/utils"));

    config.plugin("define").tap(args => {
      args[0] = Object.assign({}, args[0], {
        VUE_APP_API: JSON.stringify(BASEURL),
        VUE_APP_TITLE: JSON.stringify(BASETITLE)
      });
      return args;
    });
  },
  configureWebpack: config => {
    // 去掉console;
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  }
};
