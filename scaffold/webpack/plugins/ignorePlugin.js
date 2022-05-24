const { IgnorePlugin } = require('webpack');
const { expandConfig } = require("../../utils");
module.exports = () => {
    const ignorePluginOptions = expandConfig('ignorePlugin', {
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
    })
    return new IgnorePlugin(ignorePluginOptions)
}