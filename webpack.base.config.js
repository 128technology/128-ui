const path = require('path');

const APP_PATH = path.join(__dirname, 'src');

module.exports = {
  entry: {
    '128UI': path.join(APP_PATH, 'index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: '128UI',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpg|svg|woff|ttf|eot|woff2)([\?]?.*)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        include: [APP_PATH],
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              data: '@import "./src/styles/common";',
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
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ]
};
