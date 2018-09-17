const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const APP_PATH = path.join(__dirname, 'src');

const components = fs.readdirSync(path.join(APP_PATH, 'components'));
const entries = _.reduce(
  components,
  (acc, x) => {
    acc[`${x}/index`] = path.join(APP_PATH, `components/${x}/index.js`);
    return acc;
  },
  {}
);

module.exports = {
  entry: Object.assign(
    {},
    {
      index: path.join(APP_PATH, 'index.js')
    },
    entries
  ),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: '128-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      '@material-ui/core': path.resolve(__dirname, './node_modules/@material-ui/core')
    }
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpg|svg|woff|ttf|eot|woff2)([?]?.*)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        include: [APP_PATH],
        use: ['babel-loader']
      },
      {
        test: /\.*css$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              data: '@import "./src/styles/variables";',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  externals: [
    {
      react: {
        commonjs2: 'react',
        commonjs: 'react',
        root: 'React',
        amd: 'React'
      },
      'react-dom': {
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        root: 'ReactDOM',
        amd: 'ReactDOM'
      }
    },
    /@material-ui\/core\/*./
  ]
};
