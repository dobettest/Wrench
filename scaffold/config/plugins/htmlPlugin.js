const path = require("path");
const { expandConfig} = require("../../utils");

module.exports = () => {
  return expandConfig("htmlPlugin", {
    title: "wrench",
    favicon: path.join(__dirname, "../../template/favicon.ico"),
    template: path.join(__dirname, "../../template/index.ejs"),
    filename: "index.html",
    // chunksSortMode: "manual",
    // excludeAssets: [],
    // minify: false,
    // inject: 'body',
    templateParameters: {
    },
    // excludeChunks: ['polyfill']
  });
}