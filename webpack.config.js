const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './client/index.tsx',
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    static: {
      publicPath: '/public',
      directory: path.resolve(__dirname, './client/public'),
    },
    proxy: [
      {
        context: ['/api', '/user', '/snapshots'],
        target: 'http://localhost:3000',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
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
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'postcss-loader',
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          }, // Add postcss-loader for processing Tailwind CSS
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};
