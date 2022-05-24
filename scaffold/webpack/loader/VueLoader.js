module.exports = ({ vue = false, typescript = false }) => {
    const tsSupportOptions = typescript ? {
        loaders: {
            ts: 'ts-loader',
            tsx: 'babel-loader!ts-loader',
        }
    } : {};
    return vue ? [
        {
            test: /\.vue$/,
            use: [
                {
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: {
                            whitespace: 'condense'
                        },
                        ...tsSupportOptions
                    }
                }
            ]
        },
    ] : []
}