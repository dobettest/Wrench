const CopyPlugin = require("copy-webpack-plugin");
const { expandConfig, getRelativePath } = require("../../utils");
module.exports = () => {
    const copyPluginOptions = expandConfig("copyPlugin", {
        patterns: [
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