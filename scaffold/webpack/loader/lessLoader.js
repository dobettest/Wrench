const { expandConfig, getRelativePath } = require("../../utils");
const styleLoader = require("./styleLoader");
const lessOptions = expandConfig('lessOptions', {
    lessOptions: {
        javascriptEnabled: true
    }
})
module.exports = ({ less = false }) => {
    const lessRules = [
        {
            test: /\.less$/,
            include: /node_modules/,
            use: [
                ...styleLoader(false),
                {
                    loader: 'less-loader',
                    options: lessOptions
                }
            ],
        },
        {
            test: /\.less$/,
            include: [getRelativePath("src")],
            use: [
                ...styleLoader(),
                {
                    loader: 'less-loader',
                    options: lessOptions
                }
            ]
        }
    ]
    return less ? lessRules : [];
}