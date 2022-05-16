#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const webpack = require("webpack");
const devServer = require("webpack-dev-server");
const { expandConfig } = require("../utils");
function runner(script) {
    let config = require(`../webpack/webpack.${script}.js`);
    const _config = expandConfig('extendConfig', config);
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
            console.log('build')
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

program.parse(process.argv)