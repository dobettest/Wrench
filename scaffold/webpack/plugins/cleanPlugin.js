const { CleanPlugin } = require("webpack");
const { expandConfig } = require("../../utils");
module.exports = () => {
    const cleanPluginOptions = expandConfig('copyPlugin', {});
    return new CleanPlugin(cleanPluginOptions);
}