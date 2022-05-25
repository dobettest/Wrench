const { VueLoaderPlugin } = require("vue-loader")
const { expandConfig } = require("../../utils")
module.exports = ({ vue = false }) => {
    if (vue) {
        const VueLoaderPluginOptions = expandConfig('vuePlugin', {})
        return new VueLoaderPlugin(VueLoaderPluginOptions)
    } else {
        return null
    }
}