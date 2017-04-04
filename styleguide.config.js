const path = require('path');

module.exports = {
  require: [
    path.join(__dirname, 'src', 'fonts', '_fonts.scss')
  ],
  components: 'src/components/**/[A-Z]*.jsx',
  title: '128 UI Style Guide'
};
