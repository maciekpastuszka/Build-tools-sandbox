const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss|css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]--[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath: '../images/',
              publicPath: '../images/'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '../fonts/',
          publicPath: '../fonts/'
        },
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
    ]
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    open: true,
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'app',
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = config;
