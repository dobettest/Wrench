const { expandConfig } = require("@dobettest/scaffold/utils");
const babelOptions = require("../../config/babel");
module.exports = (envs) => {
    const inititalOptions = envs['vue'] ? { appendTsSuffixTo: [/\.vue$/] } : {}
    const tsLoaderOptions = expandConfig('tsLoader', inititalOptions);
    return {
        test: /\.(m?js|tsx?|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions(envs)
            },
            { loader: 'ts-loader', options: tsLoaderOptions }
        ]
    }
}