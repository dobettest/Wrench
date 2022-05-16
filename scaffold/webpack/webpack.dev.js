const {merge} = require('webpack-merge');
const { expandConfig } = require('../utils/index.js');
const commonConf = require('./webpack.common.js');
const defaultConf={
    mode:"development",
    devtool: 'eval-source-map',
}
module.exports=expandConfig("dev",merge(commonConf(),defaultConf));