const { expandConfig } = require("@/utils");

const baseConfig = require('./eslintRule')

module.exports = expandConfig("eslintPlugin", {
  fix: true,
  cache: true,
  baseConfig: baseConfig
});