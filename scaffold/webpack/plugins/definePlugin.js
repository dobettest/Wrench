const { DefinePlugin } = require('webpack')
const { expandConfig } = require("../../utils");
module.exports = () => {
    const defineOptions = expandConfig("definePlugin", {
        'process.env': JSON.stringify(process.env)
    })
    return new DefinePlugin(defineOptions)
}