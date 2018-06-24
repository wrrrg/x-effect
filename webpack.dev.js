const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "static"),
    publicPath: "/static/",
    filename: "bundle.min.js",
    crossOriginLoading: "anonymous"
  },
  mode: "development",
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "static"),
    proxy: {
            '/': {
                target: 'http://localhost:5000',
                secure: false,
                changeOrigin: true
            }
        }
  }
};
