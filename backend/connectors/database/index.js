const mongoose = require("mongoose")

const config = require("./../../../config")
const configModels = require("./models")
const logger = require("./../../logger")

let connection
let models = {}

function initializeModels() {
  for (let modelName in configModels) {
    //if (!configModels.hasOwnProperty(modelName)) { continue }

    let schema = new mongoose.Schema(configModels[modelName].schema)

    let methods = configModels[modelName].methods || {}
    for (let methodName in methods) {
      //if (!methods.hasOwnProperty(methodName)) { continue }
      schema.methods[methodName] = methods[methodName]
    }

    models[modelName] = mongoose.model(modelName, schema)
  }
}

module.exports = {
  models: models,

  initialize: () => {
    return new Promise((resolve, reject) => {
      let options = {
        poolSize: 20,
        socketTimeoutMS: 480000,
        keepAlive: 300000
      }

      mongoose.connect(config.database.connectionString, options).then(connection => {
        connection = connection
        initializeModels()
        logger.log("Connection to database & model initialization is successful")

        // for some reason mongoose sets up some functions in the event loop;
        // resolve after them so that when you later call close you dont get
        // an exception "topology was closed" when they try to access the connection
        setTimeout(() => {
          resolve(connection)
        }, 0)

      }).catch(error => {
        logger.log(`Connection to database could not be established ${JSON.stringify(error)}`)
        reject(error)
      })
    })

  },
  close: () => {
    return new Promise((resolve, reject) => {
      logger.log(`Connection to database is getting closed voluntarily.`)
      mongoose.disconnect().then(() => {
        logger.log(`Connection to database has been closed voluntarily.`)
        resolve()
      }).catch(error => {
        logger.log('Could not close the mongoose connection.')
        reject(error)
      })
    })
  }
}
