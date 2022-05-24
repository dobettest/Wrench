const { expandConfig } = require("../../utils");
const styleLoader = require("./styleLoader");
const sassLoader = expandConfig('sassOptions', {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
})
module.exports = ({ scss = false }) => {
    return scss ? [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            ...styleLoader(),
            sassLoader
        ]
    }] : []
}