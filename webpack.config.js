/* eslint-env node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LocalizeAssetsPlugin = require('webpack-localize-assets-plugin');

const locales = {
  en: './locales/en.json',
  es: './locales/es.json',
};

// const chunkFilename = ({ chunk: { id } }) =>
//   /^vendors-/.test(id)
//     ? 'vendors/[contenthash:8].[locale].js'
//     : '[name].[locale].js';

module.exports = function (env, argv) {
  const isProd = process.env.NODE_ENV === 'production';
  const isDev = !isProd;

  const config = {
    entry: './src/index.js',
    output: {
      clean: true,
      asyncChunks: true,
      filename: '[name].[locale].js',
      path: path.resolve(__dirname, 'docs'),
    },
    plugins: [
      new LocalizeAssetsPlugin({ warnOnUnusedString: true, locales }),
      new HtmlWebpackPlugin(),
    ],
    module: {
      rules: [{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };

  if (isProd) {
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
  }

  if (isDev) {
    argv.mode = 'development';
    config.mode = 'development';
    config.devtool = 'cheap-module-source-map';
    config.module.rules.push({
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          envName: 'development',
        },
      },
    });
    //chunkFilename: '[name].[locale].js',
    // config.output.chunkFilename = chunkFilename;
    config.devServer = {
      compress: true,
      historyApiFallback: true,
      open: true,
      client: {
        overlay: true,
        logging: 'info',
        progress: true,
        reconnect: true,
      },
    };
  }

  return config;
};
