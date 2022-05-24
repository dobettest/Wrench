const { expandConfig } = require("../../utils");
const styleLoader = require("./styleLoader");
const lessOptions = expandConfig('lessOptions', {
    lessOptions: {
        javascriptEnabled: true
    }
})
module.exports = ({less = false}) => {
    return less ? [
        {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
                ...styleLoader(),
                {
                    loader: 'less-loader',
                    options: lessOptions
                }
            ]
        }
    ] : []
}