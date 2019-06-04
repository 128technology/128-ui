const path = require('path');

module.exports = {
  require: [path.join(__dirname, 'src', 'styles', '_common.scss')],
  styleguideDir: path.join(__dirname, 'docs'),
  components: 'src/components/**/[A-Z]*.{tsx,ts}',
  title: '128 UI Style Guide',
  skipComponentsWithoutExample: true,
  propsParser: require('react-docgen-typescript').withDefaultConfig('./tsconfig.json').parse
};
