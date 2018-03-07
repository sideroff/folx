const path = require("path")

module.exports = {
  mode: process.env.NODE_MODE || "development",
  webServer: {
    port: process.env.NODE_PORT || 9000,
    publicFolderPath: path.join(__dirname, "/src")
  },
  database: {

  },
  cache: {

  }
}