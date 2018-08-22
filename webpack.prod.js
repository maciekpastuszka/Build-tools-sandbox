const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack.common.js');

const ENV = process.env.NODE_ENV;

module.exports = merge(common, {
  mode: ENV,
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
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    }),
    ENV !== 'production' ? new webpack.SourceMapDevToolPlugin({}) : undefined
  ].filter(Boolean),
});


