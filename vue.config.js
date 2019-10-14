/* eslint-disable prettier/prettier */
module.exports = {
  publicPath: "/",
  configureWebpack: config => {
    config.externals = {
      Bmap: "BMap"
    };
  },
  devServer: {
    open: true,
    proxy: {
      "/": {
        target: "http://beehive.xmiss.top/beehive",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          //重写路径
          "^/beehive": ""
        }
      }
    }
  }
};
