const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssLoader = require('./postcssLoader');
const production = process.env.NODE_ENV === "production"
module.exports = (cssModules = false, importLoaders = 2) => {
    // 处理样式中的公共loader
    return [
        // 区分开发和生产
        production ? {
            loader:MiniCssExtractPlugin.loader,
            options:{
                publicPath: '../'
            }
        }
        : "style-loader",
        {
            loader: "css-loader",
            options: {
                esModule: false,
                importLoaders: importLoaders,//允许为 @import 样式规则、CSS 模块或者 ICSS 启用/禁用或设置在 CSS loader 之前应用的 loader 的数量
                modules: cssModules ? {
                    localIdentName: "[name]__[local]--[hash:base64:5]"
                } : false
            },
        },
        postcssLoader
    ]
}