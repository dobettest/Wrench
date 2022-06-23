const { merge } = require('webpack-merge');
const assetsLoader = require('./loader/assetsLoader');
const lessLoader = require('./loader/lessLoader');
const sassLoader = require('./loader/sassLoader');
const babelLoader = require('./loader/babelLoader');
const eslintPlugin = require('./plugins/eslintPlugin');
const htmlPlugin = require('./plugins/htmlPlugin');
const copyPlugin = require('./plugins/copyPlugin');
const vueLoader = require('./loader/VueLoader');
const { getRelativePath, expandConfig } = require('../utils');
const entry = require("./entry");
const output = require("./output");
const cssLoader = require('./loader/cssLoader');
const vuePlugin = require('./plugins/vuePlugin');
const definePlugin = require('./plugins/definePlugin');
const getExtensions = (envs) => {
    const optionalExtensions = [
        //typescript为一级公民
        {
            key: 'typescript',
            extensions: ['.ts', '.tsx']
        },
        {
            key: 'vue',
            extensions: ['.vue']
        },
    ].filter((item) => envs[item.key]);
    const extensions = optionalExtensions.flatMap((item) => item.extensions)
    const ext = expandConfig("extensions", ['.mjs', '.js', '.jsx', '.json', '.wasm']);
    return [...extensions, ...ext];
};
module.exports = (mode) => {
    const isProduction = mode !== "dev"
    //加载变量
    loadEnv(mode);
    const envs = process.env.wrenchEnvs;
    const commonConfig = {
        entry: entry(envs),
        output,
        resolve: {
            alias: {
                '@': getRelativePath("./src")
            },
            extensions: getExtensions(envs)
        },
        module: {
            rules: [
                ...cssLoader(),
                ...assetsLoader(),
                ...lessLoader(envs),
                ...sassLoader(envs),
                ...babelLoader(envs),
                vueLoader(envs)
            ].filter(Boolean)
        },
        plugins: [
            copyPlugin(),
            vuePlugin(envs),
            htmlPlugin(),
            eslintPlugin(envs),
            definePlugin()
        ].filter(Boolean)
    };
    const optionalConf = isProduction ? require("./webpack.prod") : require("./webpack.dev");
    // console.log(isProduction,'mode',mode)
    return expandConfig('extendConfig', merge(commonConfig, optionalConf));
}