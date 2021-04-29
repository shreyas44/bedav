const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist/bundles/"),
    publicPath: "/bundles/",
  },
  devServer: {
    allowedHosts: ["*"],
    host: "0.0.0.0",
    port: 3000,
    contentBase: "./dist",
    compress: true,
    hot: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/graphql", "/playground"],
        target: "http://bedav-api",
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "./map.dev.env"),
      allowEmptyValues: true,
    }),
  ],
});
