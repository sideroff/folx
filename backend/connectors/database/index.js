const mongoose = require("mongoose")

const config = require("./../../../config")
const configModels = require("./models")
const logger = require("./../../logger")
const utils = require("./../../utils")
const messages = require("./../../messages")

let connection
let models = {}

function mongoosePostSaveMiddleware(error, doc, next) {
  if (!error) {
    return next()
  }

  let exception = messages.databaseException

  if (error.code === 11000) {
    let parsedMessage = utils.parseMongooseErrorMessage(error.message)
    if (parsedMessage) {
      let exceptionCode = "duplicate" + utils.capitalizeFirstLetter(parsedMessage.table.substring(0, parsedMessage.table.length - 2) + utils.capitalizeFirstLetter(parsedMessage.field)
      let correctException = messages[exceptionCode]
      if (correctException) {
        exception = correctException
      }
    }
  } else if (error.name === "ValidationError") {
    exception = Object.assign({}, messages.validationError)
    let err
    for (let field in error.errors) {
      err = error.errors[field]
      if (messages[err.message]) {
        exception.details.push(messages[err.message])
      }
    }
  }

  next(exception)
}

function initializeModels() {
  for (let modelName in configModels) {
    //if (!configModels.hasOwnProperty(modelName)) { continue }

    let schema = new mongoose.Schema(configModels[modelName].schema)
    schema.post('save', mongoosePostSaveMiddleware)

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
