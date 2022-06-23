const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { expandConfig } = require('../utils/index.js');
const IgnorePlugin = require('./plugins/ignorePlugin.js');
const CompressionPlugin = require('./plugins/compressionPlugin.js');
const TerserPlugin = require('./plugins/TerserPlugin.js');
const CleanPlugin = require('./plugins/cleanPlugin.js');
const CssMinimizerPlugin = require('./plugins/CssMinimizerPlugin.js');
const { react = false, vue = true } = process.env;
const map = {
    commonReact: react,
    commonVue: vue
}
const optionalCacheGroups = [
    {
        name: 'commonVue',
        test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
        priority: -5
    },
    {
        name: 'commonReact',
        test: /[\\/]node_modules[\\/]react(-[router-dom|router|dom])?[\\/]/,
        priority: -5
    }].reduce((groups, item) => { return map[item.name] === true ? Object.assign(groups, { [item.name]: item }) : groups }, {});


const defaultConf = {
    mode: "production",
    bail: false, // 编译出问题及时停止
    devtool: 'hidden-source-map',//生成最详细的sourcemap,但不会将source map暴露出去
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
            cacheGroups: {
                ...optionalCacheGroups,
                polyfill: {
                    test: /[\\/]node_modules[\\/]core-js[\\/]/,
                    priority: -5,
                    name: 'polyfill'
                },
                vendors: {
                    /**
                     * 当 webpack 处理文件路径时，它们始终包含 Unix 系统中的 / 和 Windows 系统中的 \。
                     * 这就是为什么在 {cacheGroup}.test 字段中使用 [\\/] 来表示路径分隔符的原因。
                     * {cacheGroup}.test 中的 / 或 \ 会在跨平台使用时产生问题。
                     */
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        //
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,//默认值是 false：每个入口 chunk 中直接嵌入 runtime
        },
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