/* eslint-env node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/locales',
            to: 'locales',
          },
        ],
      }),
    ],
    module: {
      rules: [{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
  };
  return config;
};
