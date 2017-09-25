const path = require('path');

module.exports = {
  require: [
    path.join(__dirname, 'src', 'styles', '_fonts.scss'),
    path.join(__dirname, 'mixins')
  ],
  components: 'src/components/**/[A-Z]*.jsx',
  title: '128 UI Style Guide',
  webpackConfig: require('./webpack.development.config.js')
};
