const { expandConfig } = require("../../utils")

module.exports = ({ vue = false }) => {
    const tsLoaderOptions = expandConfig('tsLoader', {});
    if (vue) {
        const a={ appendTsSuffixTo: [/TS\.vue$/] }
    }
    return [
        { test: /\.ts$/, loader: 'ts-loader', options: tsLoaderOptions },
        { test: /\.tsx$/, loader: 'babel-loader!ts-loader', options: tsLoaderOptions }
    ]
}