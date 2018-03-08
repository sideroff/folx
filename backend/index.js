const config = require("./../config")

if (config.mode === "development") {
  require("./webServer")
} else {
  require("./cluster")
}