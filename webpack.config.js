const env = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
// const { CheckerPlugin } = require('awesome-typescript-loader');
// const AssetManifestPlugin = require('asset-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const ChunksPlugin = require('webpack-split-chunks');
const _mergeConfig = require(`./config/webpack.${env}.js`);
const merge = require('webpack-merge');
const path = require('path');

const config = {
  mode: env,
  entry: [require.resolve('./polyfills'), path.resolve('./src/web/index')],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash].bundle.js'
    // publicPath: "https://cdn.example.com/assets/",
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '*'],
    alias: {
      '@': path.join(__dirname, 'src/web')
    },
    modules: [path.resolve(__dirname, 'src/web'), 'node_modules']
  },

  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',

  // Add the loader for .ts files.
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.tsx$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: env === 'development'
            }
          },
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
            options: {
              modules: {
                // 重新生成的 css 类名
                localIdentName: '[local]--[hash:base64:10]'
              }
            }
          },
          // 'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/png'
            }
          }
          // 'file-loader'
        ]
      },
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader'
      }
    ]
  },
  plugins: [
    // new CheckerPlugin(),
    // new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: './src/web/index.html'
    }),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `You application is running here http://localhost:${_mergeConfig.devServer.port}`
        ],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
    // new webpack.optimize.SplitChunksPlugin({
    //   name: 'commons',
    //   filename: 'commons.[hash:base64:10]'
    // })
    // new ChunksPlugin({
    //   to: 'vendor',
    //   test: /node_modules/ // or an array of regex
    // })
  ]
};
module.exports = merge(_mergeConfig, config);
