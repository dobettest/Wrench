const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssLoader = require('./postcssLoader');
let cachedLoader = null;
module.exports = (cssModules = false, importLoaders = 2) => {
    if (cachedLoader) {
        return cachedLoader;
    }
    // 处理样式中的公共loader
    const { NODE_ENV } = process.env;
    const production = NODE_ENV === "build";
    return cachedLoader = [
        // 区分开发和生产
        production ? {
            loader: MiniCssExtractPlugin.loader
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