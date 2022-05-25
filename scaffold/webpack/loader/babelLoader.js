const { expandConfig } = require("@dobettest/scaffold/utils");
const babelOptions = require("../../config/babel");
module.exports = (envs) => {
    const inititalOptions = envs['vue'] && envs['typescript'] ? { appendTsSuffixTo: [/\.vue$/] } : {}
    const tsLoaderOptions = expandConfig('tsLoader', inititalOptions);
    return [{
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions(envs)
            }
        ]
    },
    {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions(envs)
            },
            { loader: 'ts-loader', options: tsLoaderOptions }
        ]
    }]
}