module.exports = (type)=>{
    const version=type.replace(/^(\w)+/,'');//去除版本号
    const VueLoader=version===3?require('vue-loader'):require("vue-loader-v15")
    const defaultConf={
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: version===3?require.resolve('vue-loader'):require.resolve('vue-loader-v15'),
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
        new VueLoader.VueLoaderPlugin()
    ]
}
    return defaultConf;
}