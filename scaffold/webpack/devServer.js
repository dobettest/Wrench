const { expandConfig } = require('../utils');
module.exports = () => {
  const { NODE_ENV } = process.env;
  const open = NODE_ENV === "build" ? false : true;
  return expandConfig("devServer", {
    headers: { 'Access-Control-Allow-Origin': '*' },//qiankun支持
    historyApiFallback: {
      rewrites: [
        // 有publicpath时候默认跳转
        { from: /^\/$/, to: `/index.html` },
      ],
      // history 模式静态资源匹配
      index: '/'
    },
    client: {
      overlay: { errors: true, warnings: false }//当出现编译错误或警告时，在浏览器中显示全屏覆盖
    },
    port: 8080,
    host: "0.0.0.0",
    hot: true,      // 启用webpack的模块热替换功能
    compress: true, // 一切服务都启用gzip压缩
    open,     // 告诉dev-server在服务器启动后打开浏览器
  })
}