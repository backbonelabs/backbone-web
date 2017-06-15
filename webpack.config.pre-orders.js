const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const autoprefixerBrowserList = require('./package').browserList;

module.exports = {
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.min.css',
      allChunks: true,
      disable: false,
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer(autoprefixerBrowserList)],
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
};
