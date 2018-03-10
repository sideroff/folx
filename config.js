const path = require("path")

module.exports = {
  mode: process.env.NODE_MODE || "development",
  webServer: {
    port: process.env.NODE_PORT || 9000,
    publicFolderPath: path.join(__dirname, "/src/"),
    publiclyAccessibleFileExtToMime: {
      ".js": "application/javascript",
      ".css": "text/css",
      ".txt": "text/plain",
      ".ico": "image/x-icon",
      ".jpg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".html": "text/html",
      ".woff": "application/font-woff",
      ".woff2": "application/font-woff2"
    }
  },
  database: {

  },
  cache: {

  }
}