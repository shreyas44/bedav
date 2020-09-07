const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

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
        {from: "./src/sw.js", to: "../sw.js"}
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)|(^sw[a-zA-Z0-9\.\-\_]{0,}\.js$])/,
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

