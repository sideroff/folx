const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const config = require("./config")

let watch = config.mode === "development"

// f me
// https://gist.github.com/gricard/e8057f7de1029f9036a990af95c62ba8

// there is an issue where css files do not get updated on save
// https://github.com/webpack-contrib/mini-css-extract-plugin/issues/23
module.exports = {
  mode: config.mode,
  entry: {
    app: "./frontend/index.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: "css-loader", options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors",
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  output: {
    path: path.join(config.webServer.publicFolderPath, "/compile/"),
    filename: "[name].js"
  },
  watch,
  watchOptions: {
    ignored: /node_modules/
  },
}