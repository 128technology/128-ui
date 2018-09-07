const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.config');

const webpackConfig = {
  output: {
    filename: '[name].min.js'
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()]
};

module.exports = merge(webpackBase, webpackConfig);
