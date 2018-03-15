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
    },
    passwordSaltLength: 64
  },
  database: {
    connectionString: "mongodb://folx-dev-user:f0181546-f957-4ea6-bc05-b91597ee4209@ds113799.mlab.com:13799/folx-dev",
    name: "folx-dev",
    port: "13799",
    username: "folx-dev-user",
    password: "f0181546-f957-4ea6-bc05-b91597ee4209"
  },
  cache: {
    connectionParams: {
      host: "pub-redis-10370.eu-central-1-1.1.ec2.redislabs.com",
      port: 10370,
      password: "oT3GPG92CmeBFmL9DnUtwKxishZBNq28"
    },
    prefixes: {
      token: "t:"
    }
  }
}