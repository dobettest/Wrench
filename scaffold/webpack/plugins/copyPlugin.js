const CopyPlugin = require("copy-webpack-plugin");
const { expandConfig, getRelativePath } = require("../../utils");
const path = require('path');
module.exports = () => {
    const copyPluginOptions = expandConfig("copyPlugin", {
        patterns: [
            {
                from: path.resolve(__dirname, "../../template"),//这里有一个性能漏洞，不使用绝对路径会造成性能损耗
                to: getRelativePath('dist'),
                toType: 'dir',
                noErrorOnMissing: true,//修复public文件夹下只有一个index.html文件时的报错
                priority: -5,
                globOptions: {
                    // dot: true,
                    // gitignore: true, 打开之后template的内容不会被复制，猜测会作为定位因素
                    ignore: [
                        '.DS_Store',
                        '**/*.ejs'//不复制这个
                    ]
                }
            },
            {
                from: getRelativePath('public'),
                to: getRelativePath('dist'),
                toType: 'dir',
                noErrorOnMissing: true,//修复public文件夹下只有一个index.html文件时的报错
                globOptions: {
                    dot: true,
                    gitignore: true,
                    ignore: [
                        '.DS_Store',
                        '**/*.html'
                    ]
                }
            }
        ]
    })
    return new CopyPlugin(copyPluginOptions);
}