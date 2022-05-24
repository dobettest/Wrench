const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { expandConfig } = require('../utils/index.js');
const IgnorePlugin = require('./plugins/ignorePlugin.js');
const CompressionPlugin = require('./plugins/compressionPlugin.js');
const TerserPlugin = require('./plugins/TerserPlugin.js');
const CleanPlugin = require('./plugins/cleanPlugin.js');
const CssMinimizerPlugin = require('./plugins/CssMinimizerPlugin.js');
const defaultConf = {
    mode: "production",
    bail: false, // 编译出问题及时停止
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            TerserPlugin(),
            CssMinimizerPlugin()
        ],
        removeAvailableModules: false,//webpack将在下一个主要版本中默认设为false,以获取额外性能

        splitChunks: {
            chunks: 'all',
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
        CleanPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[contenthash:12].css',
            chunkFilename: 'css/[contenthash:12].css'
        }),
        IgnorePlugin(),
        CompressionPlugin()
    ]
};
module.exports = expandConfig("build", defaultConf);