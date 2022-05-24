const { expandConfig } = require('../utils/index.js');
const defaultConf = {
    mode: "development",
    devtool: 'eval-cheap-module-source-map',//Best support for sourcemaps whilst debugging,https://github.com/TypeStrong/ts-loader#appendtssuffixto
}
module.exports = expandConfig("dev", defaultConf);