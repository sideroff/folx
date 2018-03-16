const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const config = require("./config")

let watch = config.mode === "development"
let devtool = config.mode === "development" ? "#eval-source-map" : undefined

// f me
// https://gist.github.com/gricard/e8057f7de1029f9036a990af95c62ba8
module.exports = {
  mode: config.mode,
  entry: {
    app: "./frontend/index.js"
  },
  devtool: devtool,
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
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
    new ExtractTextPlugin("style.css")
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