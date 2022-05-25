const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { expandConfig } = require("../../utils");

module.exports = () => {
  const htmlOptions = expandConfig("htmlPlugin", {
    title: "wrench",
    favicon: path.join(__dirname, "../../template/favicon.ico"),
    template: path.join(__dirname, "../../template/index.ejs"),
    filename: "index.html",
    templateParameters: {
    }
  });
  return new HtmlWebpackPlugin(htmlOptions)
}