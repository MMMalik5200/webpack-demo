const env = process.env.NODE_ENV || "development";
const webpack = require("webpack");
const { CheckerPlugin } = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const _mergeConfig = require(`./config/webpack.${env}.js`);
const merge = require("webpack-merge");
const path = require("path");

const config = {
  mode: env,
  entry: {
    app: path.resolve("./src/web/index")
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash].bundle.js"
    // publicPath: "https://cdn.example.com/assets/",
  },
  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", "*"],
    alias: {
      "@": path.join(__dirname, "src/web")
    },
    modules: [path.resolve(__dirname, "src/web"), "node_modules"]
  },

  // Source maps support ('inline-source-map' also works)
  devtool: env === "development" ? "source-map" : "none",

  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.tsx$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.ts$/,
        loader: "ts-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
            options: {
              modules: {
                // 重新生成的 css 类名
                localIdentName: "[local]--[hash:base64:10]"
              }
            }
          },
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: MiniCssExtractPlugin.loader
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              mimetype: "image/png"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.BannerPlugin("版权所有，翻版必究"),
    new HtmlWebpackPlugin({
      template: "./src/web/index.html"
    }),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `You application is running here http://localhost:${_mergeConfig.devServer.port}`
        ],
        notes: [
          "Some additionnal notes to be displayed unpon successful compilation"
        ]
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["dist/*.*"],
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]
};
module.exports = merge(_mergeConfig, config);
