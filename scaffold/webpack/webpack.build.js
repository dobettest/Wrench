const { IgnorePlugin, CleanPlugin } = require('webpack');
const {merge} = require('webpack-merge');
const commonConf = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { expandConfig } = require('../utils/index.js');
const defaultConf = {
  mode: "production",
  bail: false, // 编译出问题及时停止
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    removeAvailableModules: false,//webpack将在下一个主要版本中默认设为false,以获取额外性能

    splitChunks: {
      chunks: function (chunk) {
        // 这里的name 可以参考在使用`webpack-ant-icon-loader`时指定的`chunkName`
        return (
          chunk.name !== 'antd-icons' &&
          chunk.name !== 'polyfill' && // 将plyfill单独抽离
          chunk.name !== 'commonReact' // react相关通用组件抽离
        );
      },
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,//入口点的最大并行请求数
      name: true,
      cacheGroups: {
        vendors: {
          /**
           * 当 webpack 处理文件路径时，它们始终包含 Unix 系统中的 / 和 Windows 系统中的 \。
           * 这就是为什么在 {cacheGroup}.test 字段中使用 [\\/] 来表示路径分隔符的原因。
           * {cacheGroup}.test 中的 / 或 \ 会在跨平台使用时产生问题。
           */
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css/, //匹配文件名
      threshold: 10240, //对超过10k的数据压缩
      minRatio: 0.8
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash:12].css',
      chunkFilename: 'css/[contenthash:12].css'
    }),
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    })
  ]
};
module.exports = expandConfig("build", merge(commonConf(), defaultConf));