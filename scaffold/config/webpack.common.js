const eslintPluginOption = require("./plugins/eslintPlugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const babelLoader = require("./loader/babelLoader");
const styleLoader = require("./loader/styleLoader");
module.exports = {
    module: {
        rules: [
            {
                test: /\.(m?js|tsx?|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelLoader()
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|ico)$/,
                type: 'asset',
                //解析
                parser: {
                    //转base64的条件
                    dataUrlCondition: {
                        maxSize: 1024, // 25kb
                    }
                },
                generator: {
                    //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
                    filename: 'fonts/[name].[contenthash:8][ext]',
                    //打包后对资源的引入，文件命名已经有/img了
                    publicPath: '../'
                }
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg|mp3)(\?.*)?$/,
                type: 'asset',
                //解析
                parser: {
                    //转base64的条件
                    dataUrlCondition: {
                        maxSize: 4 * 1024, // 25kb
                    }
                },
                generator: {
                    //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
                    filename: 'img/[name].[contenthash:8][ext]',
                    //打包后对资源的引入，文件命名已经有/img了
                    publicPath: '../'
                }
            }
            ,
            ...styleLoader()
        ]
    },
    plugins: [
        new ESLintPlugin(eslintPluginOption)
    ]
}