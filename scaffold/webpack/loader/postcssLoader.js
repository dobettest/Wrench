const { expandConfig } = require("../../utils");
const postcssOptions = expandConfig('postcss', {
    plugins: {
        autoprefixer: {}
    }
})
module.exports = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: postcssOptions
    }
}