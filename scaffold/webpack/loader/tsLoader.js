const { expandConfig } = require("../../utils")

module.exports = ({ vue = false, typescript = false }) => {
    const inititalOptions = vue ? { appendTsSuffixTo: [/TS\.vue$/] } : {}
    const tsLoaderOptions = expandConfig('tsLoader', inititalOptions);
    const tsRules = [
        { test: /\.ts$/, loader: 'ts-loader', options: tsLoaderOptions },
        { test: /\.tsx$/, loader: 'babel-loader!ts-loader', options: tsLoaderOptions }
    ]
    return typescript ? tsRules : [];
}