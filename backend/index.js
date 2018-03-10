const config = require("./../config")

config.mode === "development" ? require("./webServer") : require("./cluster")