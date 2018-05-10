const path = require("path")

module.exports = {
  mode: process.env.MODE || "development",
  webServer: {
    port: process.env.PORT || 9000,
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
    passwordSaltLength: 64,
    cookieLifetimeInMs: 20000,
    accessRights: {
      guest: 0,
      user: 1,
      admin: 2
    }
  },
  database: {
    connectionString: "mongodb://folx-dev-user:f0181546-f957-4ea6-bc05-b91597ee4209@ds113799.mlab.com:13799/folx-dev",
    name: "folx-dev",
    port: "13799",
    username: "folx-dev-user",
    password: "f0181546-f957-4ea6-bc05-b91597ee4209",
    defaultAdsLimit: 10
  },
  cache: {
    connectionParams: {
      host: "redis-16971.c3.eu-west-1-1.ec2.cloud.redislabs.com",
      port: 16971,
      password: "Vi7tWLZORwjPnhpI9MUUp5jO9uWFdpbI"
    },
    prefixes: {
      token: "t:"
    }
  },
  tests: {
    timeout: 0
  }
}