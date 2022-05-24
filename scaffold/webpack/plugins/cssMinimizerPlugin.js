const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { expandConfig } = require("../../utils");
module.exports = () => {
    const cssMinimizerPluginOptions = expandConfig('cssMinimizerPluginOptions', {})
    return new CssMinimizerPlugin(cssMinimizerPluginOptions);
}