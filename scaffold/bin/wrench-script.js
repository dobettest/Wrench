#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const webpack = require("webpack");
const devServer = require("webpack-dev-server");
const { template } = require("./wrench-template");
function runner(script) {
    let resolveConfig = require("../webpack/webpack.config");
    let compiler = null;
    try {
        compiler = webpack(resolveConfig(script));
    } catch (error) {
        throw new Error(error.message)
    }
    switch (script) {
        case "dev":
            const devServerConf = require("../webpack/devServer");
            const server = new devServer(devServerConf, compiler);
            server.startCallback(() => {
                console.log(`Starting server on http://localhost:${devServerConf["port"]}`);
            })
            break;
        case "build":
            // compiler.run((err, res) => {
            //     if (err) {
            //         console.log('err')
            //     }
            // })
            break;
        default:
            break;
    }
}
program.command("start <service>")
    .description('alias of webpack')
    .action(runner)
program.command("template <action>")
    .description("project template actions")
    .action(template);
program.parse(process.argv)