/* eslint-env node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const chunkFilename = ({ chunk: { id } }) =>
  /^vendors-/.test(id) ? 'vendors/[contenthash:8].js' : '[name].js';

module.exports = function (env, argv) {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  const config = {
    mode: isProd ? 'production' : 'development',
    devtool: isDev ? 'cheap-module-source-map' : undefined,
    entry: './src/index.js',
    output: {
      clean: true,
      asyncChunks: true,
      chunkFilename,
      filename: '[name].js',
      publicPath: '',
      path: path.resolve(__dirname, 'docs'),
    },
    plugins: [new HtmlWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProd ? 'production' : 'development',
            },
          },
        },
        { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      compress: true,
      historyApiFallback: true,
      open: true,
      // open: {
      //   app: {
      //     name: 'google-chrome'
      //   }
      // },
      client: {
        overlay: true,
        logging: 'info',
        progress: true,
        reconnect: true,
      },
    },
  };

  return config;
};
