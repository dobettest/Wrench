const { expandConfig } = require("../../utils")
module.exports = ( analyze = false) => {
    if (analyze) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        const analyzerOptions = expandConfig('analyzerOptions', {});
        return new BundleAnalyzerPlugin(analyzerOptions);
    }
    return null;
}