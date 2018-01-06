const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/app/index.js',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
      {
        test: /\.(ico)$/,
        loader: 'url-loader',
      },
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: 'build.js'
  },
  context: path.join(__dirname, 'app'),
  plugins: [HTMLWebpackPluginConfig,
    new CopyWebpackPlugin([
      { from: 'images/favicon.ico' }
    ])],
};
