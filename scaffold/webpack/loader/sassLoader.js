const { expandConfig } = require("../../utils");
const styleLoader = require("./styleLoader");
const sassLoader = expandConfig('sassOptions', {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
})
module.exports = ({ scss = false }) => {
    const scssRules = [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            ...styleLoader(),
            sassLoader
        ]
    },
    {
        test: /\.scss$/,
        include: /node_modules/,
        use: [
            ...styleLoader(false),
            sassLoader
        ]
    }
    ]
    return scss ? scssRules : []
}