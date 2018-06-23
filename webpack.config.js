// where is the entry point
// where is it putting the bundled file

const path = require("path");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    crossOriginLoading: "anonymous"
  },
  mode: "none",
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public")
  }
};
