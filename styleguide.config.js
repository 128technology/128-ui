const path = require('path');

module.exports = {
  require: [
    path.join(__dirname, 'src', 'styles', '_fonts.scss')
  ],
  components: './src/components/**/[A-Z]*.jsx',
  title: '128 UI Style Guide',
  webpackConfig: function() {
    const webpackConfig = require('./webpack.development.config');

    return {
      module: webpackConfig.module
    };
  }
};
