const path = require('path')
const common = require('./webpack.common')
const {merge} = require('webpack-merge')

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "./dist/bundles/"),
    publicPath: '/bundles/',
  },
  devServer: {
    allowedHosts: [
      "*"
    ],
    host: '0.0.0.0',
    port: 80,
    contentBase: "./dist",
    compress: true,
    hot: true,
    historyApiFallback: true,
    proxy: [{
        context: ['/graphql/'],
        target: 'http://bedav-api'
      },
    ],
  },
})

