const { expandConfig, wrenchConfig } = require("../../utils");
let { type = "react" } = wrenchConfig()
type = type.replace(/\d/g, '')
module.exports = expandConfig('babel', {
    presets: [
        [
            "@babel/preset-env",
            {
                "loose": false,//开启会转化成es5的写法,polyfill方法将以直接挂载原型,关闭则是以defineProperty方法
                "modules": false, // tree-shaking 需要,Setting this to false will preserve(保持) ES modules.
                "corejs": "3",
                "useBuiltIns": "entry", // Allow importing core-js in entrypoint and use browserlist to select polyfills
                "exclude": ['transform-typeof-symbol'], // Exclude transforms that make all code slower
            }
        ],
        "@babel/preset-typescript",
        "@babel/preset-react",
        "@vue/cli-plugin-babel/preset"
    ],
    plugins: [
        "@babel/plugin-transform-runtime"
    ],
    cacheDirectory: true
})