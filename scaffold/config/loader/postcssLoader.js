const { expandConfig } = require("../../utils");

module.exports = expandConfig('postcss', {
    plugins: {
        autoprefixer: {}
    }
})