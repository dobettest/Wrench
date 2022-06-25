const { expandConfig } = require("../../utils")
module.exports = () => {
    const { iconPaths, options, enable } = expandConfig('iconsLoader', {
        iconPaths: [],
        options: {},
        enable: false
    })
    const iconLoader = () => {
        if (enable) {
            return {
                test: /\.svg$/,
                include: iconPaths,
                exclude: /node_modules/,
                use: [{
                    loader: 'svg-sprite-loader',
                    options: {
                        symbolId: 'icon-[name]',
                        ...options
                    }
                }]
            }
        }
        return null;
    }
    const staticLoaders = [
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
                filename: 'fonts/[name].[contenthash:8][ext]'
            }
        },
        {
            test: /\.(png|jpe?g|gif|webp|svg|mp3)(\?.*)?$/,
            type: 'asset',
            exclude: iconPaths,//排除icons
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
            }
        }
    ]
    return [
        iconLoader(),
        ...staticLoaders
    ]
}