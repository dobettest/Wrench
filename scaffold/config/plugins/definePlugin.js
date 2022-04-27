const { expandConfig, loadEnv } = require("@/utils");
module.exports = (mode) => {
    //加载变量
    loadEnv(mode)
    expandConfig("definePlugin", {
        'process.env': JSON.stringify(process.env)
    })
}