const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const APP_PATH = path.join(__dirname, 'src');

const components = fs.readdirSync(path.join(APP_PATH, 'components'));
const entries = _.reduce(
  components,
  (acc, x) => {
    acc[`${x}/index`] = path.join(APP_PATH, `components/${x}/index.ts`);
    return acc;
  },
  {}
);

const config = {
  entry: Object.assign(
    {},
    {
      index: path.join(APP_PATH, 'index.ts')
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
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
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
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          'babel-loader',
          {
            loader: 'ts-loader'
          }
        ]
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
  externals: [nodeExternals()],
  plugins: [new UglifyJsPlugin()]
};

module.exports = (env, argv = {}) => {
  if (argv.mode === 'development') {
    config.devtool = 'sourcemap';
  }

  return config;
};
