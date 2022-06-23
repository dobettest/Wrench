const { expandConfig, getRelativePath } = require("../utils");
module.exports = () => {
    const entrys = {
        polyfill: ['core-js'],
        'app': getRelativePath('src/app.js')
    }
    return expandConfig('entry', entrys)
}