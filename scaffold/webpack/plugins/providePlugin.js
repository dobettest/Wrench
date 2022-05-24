const { ProvidePlugin } = require("webpack")
const { expandConfig } = require("../../utils");
module.exports = () => {
    const provideOptions = expandConfig("providePlugin", {})
    return new ProvidePlugin(provideOptions);
}