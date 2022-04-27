// https://cn.eslint.org/ ESLint中文文档
const { wrenchConfig } = require("@/utils");

const {
  prettierFixed = true,
  type = "react"
} = wrenchConfig();

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
  "react/display-name": "off",
  "quotes": [
    "off",
    "single"
  ],
  // 只提示声明了propTypes的组件的错误
  "react/prop-types": [
    "warn",
    { "skipUndeclared": true }
  ],
  "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
  "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
}

if (prettierFixed) {
  rules["prettier/prettier"] = ["error", {
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

const eslintConfig = {
  // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
  env: {
    browser: true, // 浏览器环境中的全局变量
    node: true, // Node.js 全局变量和 Node.js 作用域
    es6: true, // 启用es6语法
    jest: true // Jest 全局变量
  },
  // 执行期间访问的额外的全局变量
  globals: {
    // APP: true 支持全局变量APP
  },
  // 继承规则
  extends: [
    "plugin:sonarjs/recommended",
    "eslint:recommended",
    `plugin:${type}/recommended`,
    "plugin:prettier/recommended"
  ].filter(item => {
    if (!prettierFixed && item === "plugin:prettier/recommended") {
      return false;
    }
    return true;
  }),
  parserOptions: {
    // 设置代码为ECMAScript模块
    sourceType: "module",
    // 启用JSX
    ecmaFeatures: {
      "jsx": true
    },
    parser: "@babel/eslint-parser"
  },
  // 使用第三方插件
  plugins: [
    "sonarjs",
    "react", // react语法检查
    "import", // es6的import语法规则检查
    "react-hooks", // react hooks 语法检查
    "prettier"
  ].filter(item => {
    if (!prettierFixed && item === "prettier") {
      return false;
    }
    return true;
  }),
  // https://cn.eslint.org/docs/rules/ 
  rules
};

module.exports = eslintConfig;
