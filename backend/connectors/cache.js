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
  setSession(token, data) {
    return new Promise((resolve, reject) => {
      if (typeof data !== "string") {
        try {
          data = JSON.stringify(data)
        } catch (error) {
          data = data.toString()
        }
      }

      this.client.set(config.cache.prefixes.token + token, data, (error, data) => {
        if (error) {
          return reject(error)
        }
        resolve()
      })
    })
  }
  
  getSession(token) {
    return new Promise((resolve, reject) => {
      this.client.get(token, (error, session) => {
        if (error) {
          return reject(error)
        }
        resolve(session)
      })
    })
  }

  close() {
    this.client.quit()

    logger.log(`Connection to redis has been closed voluntarily.`)

    return Promise.resolve()
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