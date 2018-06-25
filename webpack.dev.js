const path = require('path');

module.exports = {
  entry: {
      'styles': './src/styles/styles.scss',
      'bundle': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, '/static'),
    publicPath: '/static/',
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    proxy: {
            '/': {
                target: 'http://localhost:5000',
                secure: false,
                changeOrigin: true
            }
        }
  }
};
