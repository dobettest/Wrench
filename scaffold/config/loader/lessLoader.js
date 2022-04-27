const { expandConfig } = require("@/utils");

module.exports = expandConfig('less', {
    lessOptions: {
        javascriptEnabled: true
    }
})