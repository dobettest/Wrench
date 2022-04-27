const { expandConfig } = require('../utils');
const { publicPath = '/', NODE_ENV = "development" } = process.env;
module.exports = expandConfig("devServer", {
  historyApiFallback: {
    rewrites: [
      // 有publicpath时候默认跳转
      { from: /^\/$/, to: `${publicPath}index.html` },
    ],
    // history 模式静态资源匹配
    index: publicPath
  },
  port: 8080,
  host: "0.0.0.0",
  hot: true,      // 启用webpack的模块热替换功能
  compress: true, // 一切服务都启用gzip压缩
  open: NODE_ENV === "production" ? false : true,     // 告诉dev-server在服务器启动后打开浏览器
})