var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var dist = path.resolve(__dirname, 'dist')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: '[hash].js',
    path: dist
  },
  plugins: [
    new CleanWebpackPlugin(dist),
    new HtmlWebpackPlugin()
  ],
  devtool: 'source-map'
}
