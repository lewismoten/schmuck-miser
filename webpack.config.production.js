/* eslint-env node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env, argv) {
  const config = {
    entry: './src/index.js',
    output: {
      clean: true,
      asyncChunks: true,
      filename: '[name].js',
      path: path.resolve(__dirname, 'docs'),
    },
    plugins: [new HtmlWebpackPlugin()],
    module: {
      rules: [{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };

  argv.mode = 'production';
  config.mode = 'production';
  config.devtool = 'source-map';
  config.module.rules.push({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: false,
        envName: 'production',
      },
    },
  });
  return config;
};
