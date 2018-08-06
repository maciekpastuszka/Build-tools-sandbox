const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/js/index.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/dist/'
  },
  mode: 'development',
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'src/css'),
      path.resolve(__dirname, 'src/fonts')
    ]
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|svg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath: '../images/',
              publicPath: '../images/'
            }
          }
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: '../fonts/',
          publicPath: '../fonts/'
        },
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: '../css/main.css', disable: false, allChunks: true}),
  ],
};

module.exports = config;
