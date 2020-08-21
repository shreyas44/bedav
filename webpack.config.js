const path = require('path')

module.exports = {
  mode: "development""
  entry: "./bedav/pages/src/index.js",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, "bedav/pages/static/pages/js")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}