const path = require('path')
const common = require('./webpack.common')
const {merge} = require('webpack-merge')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "./dist/bundles/"),
    publicPath: '/bundles/',
  },
  pulgins: [
    new Dotenv({
      path: '/env/map.env'
    })
  ]
})

