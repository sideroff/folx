const redis = require("redis")

const config = require("./../../config")
const logger = require("./../logger")

class Cache {
  initialize() {
    return new Promise((resolve, reject) => {
      this.client = redis.createClient(config.cache.connectionParams)

      this.client.on("ready", () => {
        logger.log("Cache connection established successfully.")
        resolve()
      })

      this.client.on("error", error => {
        logger.log(`Connection to cache could not be established ${JSON.stringify(error)}`)
        reject(error)
      })
    })
  }

  closeConnection() {
    this.client.quit()
  }
}

let instance

function getInstance() {
  if (!instance) {
    instance = new Cache()
  }

  return instance
}

module.exports = getInstance()