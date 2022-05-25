const styleLoader = require("./styleLoader")
module.exports = () => {
    return [
        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: styleLoader()
        },
        {
            test: /\.css$/,
            include: /node_modules/,
            use: styleLoader(false)
        }
    ]
}