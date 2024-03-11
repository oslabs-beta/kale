const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    historyApiFallback: true,
    static: {
      publicPath: '/dist',
      directory: path.resolve(__dirname, 'dist'),
    },
    proxy: [
      {
        context: ['/'],
        target: 'http://localhost:3000',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'development',
      template: './client/public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
