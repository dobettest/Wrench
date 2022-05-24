type htmlPluginOptions = import("html-webpack-plugin").Options
type entryOptions = import("webpack").EntryOptions
type copyPluginOptions = import("copy-webpack-plugin").PluginOptions
type devServerOptions = import("webpack-dev-server").Configuration
type webpackOptions = import("webpack").Configuration
type wrenchConfig = {
    types: "vue" | "react",
    typescript: boolean,
    jsx: boolean,
    entry: (config: entryOptions) => entryOptions;
    htmlPlugin: (config: htmlPluginOptions) => htmlPluginOptions,
    less: (config: any) => any,
    scss: (config: any) => any,
    copyPlugin: (config: copyPluginOptions) => copyPluginOptions,
    output: (config: any) => any,
    devServer: (config: devServerOptions) => devServerOptions,
    babel: (config: any) => any,
    extendConfig: (config: webpackOptions) => webpackOptions
}
export default wrenchConfig