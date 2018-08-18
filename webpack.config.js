const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: './src/js/index.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/dist/'
  },
  mode: 'production',
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'src/css'),
      path.resolve(__dirname, 'src/fonts')
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
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
  }
};

module.exports = config;
