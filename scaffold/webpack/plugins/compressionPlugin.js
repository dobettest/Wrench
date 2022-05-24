const CompressionWebpackPlugin = require("compression-webpack-plugin")
const { expandConfig } = require("../../utils")
module.exports = () => {
    const compressionPluginOptions = expandConfig('compressionPlugin', {
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.js$|\.css/, //匹配文件名
        threshold: 10240, //对超过10k的数据压缩
        minRatio: 0.8
    })
    return new CompressionWebpackPlugin(compressionPluginOptions)
}