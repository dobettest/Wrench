const babelOptions = require("../../config/babel");
module.exports = (envs) => {
    return {
        test: /\.(m?js|tsx?|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: babelOptions(envs)
            }
        ]
    }
}
