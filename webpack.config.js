const path = require('path');

const APP_PATH = path.join(__dirname, 'src');

module.exports = {
  entry: [
    path.join(APP_PATH, 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '128-ui.js',
    library: '128-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [{
      test: /\.(gif|png|jpg|svg|woff|ttf|eot|woff2)([\?]?.*)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }]
    }, {
      test: /\.css$/,
      include: [ APP_PATH ],
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.jsx?$/,
      include: [ APP_PATH ],
      use: ['babel-loader']
    }, {
      test: /\.scss$/,
      include: [ APP_PATH ],
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            data: '@import "./src/styles/common";',
            sourceMap: true
          }
        }
      ]
    }]
  }
};
