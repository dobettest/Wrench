const { expandConfig } = require("../utils");

// https://cn.eslint.org/ ESLint中文文档
const rules = {
    "indent": "off",
    "no-tabs": "off",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "no-useless-escape": "warn",
    "no-mixed-spaces-and-tabs": "off",
    "no-param-reassign": "off",
    "radix": "off",
    // 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
    "max-nested-callbacks": [
        "error",
        3
    ],
    "no-multi-spaces": "warn",
    "semi": "warn",
    "no-new-func": "off",
    "no-multiple-empty-lines": "off",
    "no-cond-assign": "warn",
    "eqeqeq": "off",
    "no-multi-assign": ["off"],
    "class-methods-use-this": ["off"],
    "quotes": [
        "off",
        "single"
    ]

}
module.exports = (envs) => {
    const addtionalOptions = [
        {
            extend: 'plugin:vue/recommended',
            key: 'vue',
            rules: {},
            plugins:['vue']
        },
        {
            extend: 'plugin:react/recommended',
            key: 'react',
            plugins: ['react', 'react-hooks'],
            rules: {
                "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
                "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
            }
        },
        {
            extend: 'plugin:prettier/recommended',
            key: 'prettier',
            plugins: ['prettier'],
            rules: {
                "prettier/prettier": ["error", {
                    "arrowParens": "always",
                    "bracketSameLine": false,
                    "bracketSpacing": true,
                    "embeddedLanguageFormatting": "auto",
                    "htmlWhitespaceSensitivity": "css",
                    "insertPragma": false,
                    "jsxSingleQuote": true,
                    "printWidth": 80,
                    "proseWrap": "preserve",
                    "quoteProps": "as-needed",
                    "requirePragma": false,
                    "semi": true,
                    "singleQuote": true,
                    "trailingComma": "es5",
                    "useTabs": false,
                    "vueIndentScriptAndStyle": false,
                    "tabWidth": 2
                }]
            }
        }
    ].filter((item) => { return envs[item.key] === true });
    const extendConfigs = addtionalOptions.map((item) => item.extend);
    const addtionalPlugins = addtionalOptions.flatMap((item) => item.plugins);
    const eslintConfig = expandConfig('eslintPlugin', {
        env: {
            browser: true, // 浏览器环境中的全局变量
            node: true, // Node.js 全局变量和 Node.js 作用域
            es6: true, // 启用es6语法
            jest: false // Jest 全局变量
        },
        globals: {

        },
        // 继承规则
        extends: [
            "eslint:recommended",
            "plugin:sonarjs/recommended",
            ...extendConfigs
        ],
        parserOptions: {
            // 设置代码为ECMAScript模块
            sourceType: "module",
            // 启用JSX
            ecmaFeatures: {
                "jsx": true
            }
        },
        // 使用第三方插件
        plugins: [
            "sonarjs",
            "import", // es6的import语法规则检查
            ...addtionalPlugins
        ],
        // https://cn.eslint.org/docs/rules/ 
        rules
    });
    return eslintConfig;
};
