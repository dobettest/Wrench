const { expandConfig, wrenchConfig } = require("@/utils");
const { typescript = false, type = "react" } = wrenchConfig()
module.exports = expandConfig('babel', {
    presets: [
        [
            "@babel/preset-env",
            {
                "modules": false, // tree-shaking 需要
                "corejs": "3",
                "useBuiltIns": "entry", // Allow importing core-js in entrypoint and use browserlist to select polyfills
                "exclude": ['transform-typeof-symbol'], // Exclude transforms that make all code slower
            }
        ],
        typescript ? "@babel/preset-typescript" : null,
        ["@babel/preset-react", "@vue/cli-plugin-babel/preset"].filter((item) => item.includes(type))
    ].filter(Boolean),
    plugins: [
        "@babel/plugin-transform-runtime"
    ],
    cacheDirtory: true
})