const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const path = require("path");

module.exports = {
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "static"),
    filename: "bundle.min.js",
    crossOriginLoading: "anonymous"
  },
  mode: "production",
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
           MiniCssExtractPlugin.loader,
           "css-loader",
           "sass-loader"
        ]
      }
    ]
  },
  devtool: "source-map",
  plugins: [new MiniCssExtractPlugin({
	filename: "styles.min.css"
	})]
};
