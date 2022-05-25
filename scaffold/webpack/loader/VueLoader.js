module.exports = ({ vue = false, typescript = false }) => {
    const tsSupportOptions = typescript ? {
        loaders: {
            ts: 'ts-loader',
            tsx: 'babel-loader!ts-loader',
        }
    } : {};
    const vueRule = {
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
    }
    return vue ? vueRule : null;
}