const path = require('path');

module.exports = {
  require: [path.join(__dirname, 'src', 'styles', '_common.scss')],
  styleguideDir: path.join(__dirname, 'docs'),
  components: 'src/components/**/[A-Z]*.jsx',
  title: '128 UI Style Guide',
  webpackConfig: require('./webpack.config.js'),
  skipComponentsWithoutExample: true
};
