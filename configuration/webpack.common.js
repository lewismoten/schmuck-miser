/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const config = {
    entry: './src/index.js',
    output: {
      clean: true,
      asyncChunks: true,
      filename: '[name].js',
      path: path.resolve(__dirname, '../docs'),
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
    module: {
      rules: [{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      fallback: {
        crypto: require.resolve('crypto-browserify'),
      },
    },
  };
  return config;
};
