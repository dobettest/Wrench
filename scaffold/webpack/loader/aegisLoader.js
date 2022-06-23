const { expandConfig, getRelativePath } = require("../../utils");
const path = require('path');
module.exports = ({ aegis = false }) => {
    const { entry, ...aegisOptions } = expandConfig('aegisOptions', {});
    if (aegis) {
        return {
            test: /\.(jsx?|tsx?)$/,
            include: [getRelativePath(entry)],//转化成绝对路径
            use: [
                {
                    loader: path.resolve(__dirname, '../aegis.js'),
                    options: aegisOptions
                }
            ]
        }
    }
    return {};
}