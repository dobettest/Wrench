const { expandConfig, getRelativePath } = require("../utils");
const path = require('path');
const { name } = require(path.resolve(process.cwd(), "package.json"));
module.exports = ({ micro = false, publicPath = "" }) => {
    const optionalOutput = () => {
        return micro ? {
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            chunkLoadingGlobal: `webpackJsonp_${name}`,
            globalObject: 'window',
        } : {}
    }
    return expandConfig('output', {
        clean: true,// 在生成文件之前清空 output 目录
        filename: "[name].js",
        path: getRelativePath("dist"),
        publicPath,
        ...optionalOutput()
    })
}