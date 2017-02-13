const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/index',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('styles.css', {
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel'],
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'url-loader',
    }, {
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!sass-loader'),
    }],
  },
  postcss() {
    return [
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ];
  },
};
