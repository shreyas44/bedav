const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const Dotenv = require("dotenv-webpack")

module.exports = {
  entry: {
    main: "./web/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./web/index.html",
      filename: "../index.html",
      manifest: "./manifest.json"
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./web/manifest.json", to: "../manifest.json" },
        { from: "./icons/**", to: "../" }
      ]
    }),
    new ServiceWorkerWebpackPlugin({
      entry: "./web/sw.js",
      filename: "../sw.js",
    }),
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

