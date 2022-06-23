const { expandConfig, getRelativePath } = require("../utils");
const path=require('path');
const { micro = false } = process.env.wrenchEnvs;
const { name } = require(path.resolve(process.cwd(), "package.json"));
const optionalOutput = () => {
    return micro ? {
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        jsonpFunction: `webpackJsonp_${name}`,
        globalObject: 'window',
    } : {}
}
module.exports = expandConfig('output', {
    clean: true,// 在生成文件之前清空 output 目录
    filename: "[name].js",
    path: getRelativePath("dist"),
    ...optionalOutput()
})