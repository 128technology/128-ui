const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.config');

const webpackConfig = {
  devtool: 'sourcemap'
};

module.exports = merge(webpackBase, webpackConfig);
