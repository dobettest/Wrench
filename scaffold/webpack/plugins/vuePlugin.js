const { VueLoaderPlugin } = require("vue-loader")
const { expandConfig } = require("../../utils")
module.exports = () => {
    const VueLoaderPluginOptions = expandConfig('vuePlugin', {})
    return new VueLoaderPlugin(VueLoaderPluginOptions)
}