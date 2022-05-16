const sassLoader = require('./sassLoader');
const lessLoader = require('./lessLoader');
const postcssLoader = require('./postcssLoader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getRelativePath } = require('../../utils');
module.exports = () => {
    const isProduction = process.env.NODE_ENV === "production";
    // 处理样式中的公共loader
    const commonUse = (importLoaders = 2, isCSSModules = false, includeNodeModules = false) => {
        return [
            // 区分开发和生产
            isProduction ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            } : "style-loader",
            {
                loader: "css-loader",
                options: {
                    esModule: false,
                    importLoaders: importLoaders,//允许为 @import 样式规则、CSS 模块或者 ICSS 启用/禁用或设置在 CSS loader 之前应用的 loader 的数量
                    modules: isCSSModules ? {
                        localIdentName: "[name]__[local]--[hash:base64:5]"
                    } : false
                },
            },
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: postcssLoader
                }
            },
            // {
            //     loader: "resolve-url-loader", // 处理文件中的所有url地址
            //     options: {}
            // },

        ].filter(Boolean)
    };

    // 按类型生成不同loader
    const commonLoaders = (type = "css") => {
        if (type === "css") {
            return [
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: commonUse(2, false)
                },
                {
                    test: /\.css$/,
                    include: /node_modules/,
                    use: commonUse(2, false, true)
                }
            ];
        } else if (type === "less") {
            return [
                {
                    test: /\.less$/,
                    include: [
                        getRelativePath('src')
                    ],
                    use: [
                        ...commonUse(3, false),
                        {
                            loader: 'less-loader',
                            options: lessLoader
                        }
                    ],
                },
                {
                    test: /\.less$/,
                    include: /node_modules/,
                    use: [
                        ...commonUse(3, false, true),
                        {
                            loader: 'less-loader',
                            options: lessLoader
                        }
                    ],
                }
            ];
        } else if (type === "scss") {
            return [
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        ...commonUse(3, false),
                        {
                            loader: 'sass-loader',
                            options: sassLoader
                        }
                    ],
                },
                {
                    test: /\.scss$/,
                    include: /node_modules/,
                    use: [
                        ...commonUse(3, false, true),
                        {
                            loader: 'sass-loader',
                            options: sassLoader
                        }
                    ]
                }
            ];
        }
    }

    return [
        ...commonLoaders("css"),
        ...commonLoaders("less"),
        ...commonLoaders("scss"),
    ];
}