const { expandConfig, getRelativePath } = require("../utils");
module.exports = () => {
    const entrys = {
        'app': getRelativePath('src/app.js')
    }
    return expandConfig('entry', entrys)
}