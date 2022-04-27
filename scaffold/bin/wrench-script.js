#!/usr/bin/env node
const minimist = require('minimist');
const rawArgs = process.argv.slice(2);
const args = minimist(rawArgs);
const { Command } = require("commander");
const program = new Command();
const webpack = require("webpack");
const devServer = require("webpack-dev-server");
const { merge } = require("webpack-merge");
const { wrenchConfig, expandConfig } = require("../utils");
function runner(script) {
    let { extendConfig } = wrenchConfig();
    let config = require(`../webpack/webpack.${script}.js`);
    const _config = merge(config, expandConfig('extendConfig', extendConfig))
    const compiler = webpack(_config);
    switch (script) {
        case "dev":
            const devServerConf = require("../config/devServer");
            const server = new devServer(devServerConf, compiler);
            server.startCallback(() => {
                console.log(`Starting server on http://localhost:${devServerConf["port"]}`);
            })
            break;
        case "build":
            compiler.run((err, res) => {
                if (err) {
                    console.log(err)
                }
            })
            break;
        default:
            break;
    }
}
program.command("create <framework> <appname>")
    .description("create a framework app")
    .action(() => { })
program.command("start <service>")
    .description('start dev-server')
    .action(runner)

program.parse(process.argv)