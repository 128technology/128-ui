const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.config');

const webpackConfig = {
  output: {
    filename: '[name].min.js'
  },
  plugins: [new UglifyJsPlugin()]
};

module.exports = merge(webpackBase, webpackConfig);
