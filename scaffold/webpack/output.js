const { expandConfig,getRelativePath } = require("../utils");
module.exports = expandConfig('output', {
    filename:"[name].js",
    path:getRelativePath("dist")
})