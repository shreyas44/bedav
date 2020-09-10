const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "../index.html",
      manifest: "./manifest.json"
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {from: "./src/manifest.json", to: "../manifest.json"},
        {from: "./icons/**", to: "../"}
      ]
    }),
    new ServiceWorkerWebpackPlugin({
      entry: "./src/sw.js",
      filename: "../sw.js",
    }),
    //new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|sw.js)/,
        use: {
          loader: "babel-loader"
          
        }
      },
      {
        test: /\.html$/,
      }
    ],
  }
}

