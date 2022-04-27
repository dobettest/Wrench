const { VueLoaderPlugin } = require("vue-loader")
module.exports = {
    resolve: {
        extensions: [".vue"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                whitespace: 'condense'
                            }
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}