const { expandConfig } = require("../../utils");
const postcssOptions = expandConfig('postcss', {
    plugins: {
        autoprefixer: {}
    }
})
module.exports = {
    loader: 'postcss-loader',
    exclude: /node_modules/,
    options: {
        postcssOptions: postcssOptions
    }
}