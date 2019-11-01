const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
​
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg)$/i,
        use: [
          'file-loader'
        ],
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    historyApiFallback: true,
    proxy: {
      "/api/users": "http://localhost:5000"
    },
    allowedHosts: [
        'localhost.socioprophet.com',
        'socioprophet.com'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
