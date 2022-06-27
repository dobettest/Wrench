const babelOptions = require("../../config/babel");
module.exports = (envs) => {
    const tsxOptions = envs['vue'] && envs['typescript'] ? { appendTsxSuffixTo: [/\.vue$/] } : {};
    const tsOptions = envs['vue'] && envs['typescript'] ? { appendTsSuffixTo: [/\.vue$/] } : {};
    const babelLoaderOptions = babelOptions(envs);
    return [{
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelLoaderOptions
            }
        ]
    },
    {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelLoaderOptions
            },
            {
                loader: 'ts-loader',
                options: tsOptions
            }
        ]
    },
    {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelLoaderOptions
            },
            {
                loader: 'ts-loader',
                options: tsxOptions
            }
        ]
    }
    ]
}