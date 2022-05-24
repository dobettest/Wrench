const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const { expandConfig } = require("../../utils");
const baseConfig = require("../../config/eslint")
module.exports = (envs) => {
  const eslintOptions = expandConfig("eslintPlugin", {
    fix: envs['fix'],
    cache: true,
    baseConfig: baseConfig(envs)
  })
  return new ESLintWebpackPlugin(eslintOptions);
}