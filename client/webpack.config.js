var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin('dist/*'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        // collapseWhitespace: true
      }
    })
  ],
  devtool: 'source-map'
}
