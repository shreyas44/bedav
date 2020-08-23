const path = require('path')

module.exports = {
  mode: "development",
  entry: "./bedav/pages/src/index.js",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, "bedav/pages/static/pages/js"),
    publicPath: '/static/pages/js/',
  },
  devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, "bedav/pages/static"),
    contentBasePublicPath: 'http://localhost:8000',
    compress: true,
    hot: true,
    proxy: {
      '/graphql/': {
        target: 'http://localhost:8000'
      },
      '!/static/**': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
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
