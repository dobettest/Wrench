const TerserPlugin = require('terser-webpack-plugin');
const { expandConfig } = require("../../utils");
module.exports = () => {
    const terserPluginOptions = expandConfig("terserPlugin", {
        terserOptions: {
            compress: {
                drop_console: true,
            }
        }
    })
    return new TerserPlugin(terserPluginOptions);
}