const mongoose = require("mongoose")

const config = require("./../../../config")
const configModels = require("./models")
const logger = require("./../../logger")

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
      mongoose.connect(config.database.connectionString).then(connection => {
        initializeModels()
        logger.log("Connection to database & model initialization is successful")
        resolve(connection)
      }).catch(error => {
        logger.log(`Connection to database could not be established ${JSON.stringify(error)}`)
        reject(error)
      })
    })

  }
}
