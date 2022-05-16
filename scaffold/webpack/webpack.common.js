const eslintPluginOption = require("../config/plugins/eslintPlugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const babelLoader = require("../config/loader/babelLoader");
const styleLoader = require("../config/loader/styleLoader");
const entry = require("../config/entry");
const { wrenchConfig, getRelativePath } = require("../utils");
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlPlugin = require("../config/plugins/htmlPlugin");
let { type = 'react' } = wrenchConfig();
const defaultConf = {
    entry,
    resolve: {
        alias: {
            '@': getRelativePath('src')
        },
        extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm']
    },
    output: {
        filename: '[name].js',
        path: getRelativePath("dist")
    },
    module: {
        rules: [
            {
                test: /\.(m?js|tsx?|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelLoader
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
        new HtmlWebpackPlugin(htmlPlugin()),
        new ESLintPlugin(eslintPluginOption),
    ]
}
module.exports = () => {
    if (/^(vue)/.test(type)) {
        const vueLoader = require("../config/loader/vueLoader")
        return merge(defaultConf, vueLoader(type))
    } else {
        return defaultConf;
    }
}