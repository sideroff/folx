const path = require("path")
const webpack = require("webpack")

const config = require("./config")

let watch = config.mode === "development"

// f me
// https://gist.github.com/gricard/e8057f7de1029f9036a990af95c62ba8
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
  output: {
    path: path.join(config.webServer.publicFolderPath, "/compile/"),
    filename: "[name].js"
  },
  watch,
  watchOptions: {
    ignored: /node_modules/
  },
}