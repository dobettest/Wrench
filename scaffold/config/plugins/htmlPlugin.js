const path = require("path");
const { expandConfig, wrenchConfig, projectPath } = require("@/utils");
const package = require(path.resolve(projectPath, './package.json'));

module.exports = (mode) => {
  return expandConfig("htmlPlugin", {
    title: "wrench",
    favicon: path.resolve(__dirname, "../../template/favicon.ico"),
    template: path.resolve(__dirname, "../../template/index.ejs"),
    filename: "index.html",
    chunksSortMode: "manual",
    excludeAssets: [],
    minify: false,
    inject: 'body',
    templateParameters: {
      cdn: {
        js: cdn['js'],
        css: cdn['css']
      }
    }
    // excludeChunks: ['polyfill']
  });
}