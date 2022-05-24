const { DefinePlugin } = require('webpack')
const { expandConfig, loadEnv } = require("../../utils");
module.exports = (mode) => {
    //加载变量
    loadEnv(mode)
    const defineOptions = expandConfig("definePlugin", {
        'process.env': JSON.stringify(process.env)
    })
    return new DefinePlugin(defineOptions)
}