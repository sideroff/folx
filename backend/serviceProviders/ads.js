const messages = require("./../messages")
const db = require("./../connectors/database")
const logger = require("./../logger")
const config = require("./../../config")
const adSchema = require("./../connectors/database/models").Ad.schema
const accessRights = config.webServer.accessRights

module.exports = {
  accessRights: {
    create: accessRights.user,
    getById: accessRights.guest,
    get: accessRights.guest,
  },
  create: (params, res) => {
    return new Promise((resolve, reject) => {

      for (let k in params) {
        if (typeof params[k] === "string") {
          params[k] = params[k].trim()
        }
      }

      if (typeof params.title !== "string" || params.title.length === 0) {
        return reject(messages.adTitleIsRequired)
      } else if (typeof params.description !== "string" || params.description.length === 0) {
        return reject(messages.adDescriptionIsRequired)
      } else if (typeof params.price !== "number") {
        return reject(messages.adPriceIsRequired)
      } else if (params.price < 0) {
        return reject(messages.adPriceMustBePositive)
      }

      new db.models.Ad(params).save().then(result => {
        let message = Object.assign({}, messages.adCreationSuccessful, { id: result.id })
        resolve(message)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getById: (params, res) => {
    return new Promise((resolve, reject) => {
      db.models.Ad.findOne({ _id: params.id }).then(result => {
        if (result === null) {
          return reject(messages.adDoesNotExist)
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  get: (params, res) => {
    return new Promise((resolve, reject) => {
      db.models.Ad.find().limit(params.limis || config.database.defaultAdsLimit).skip(params.skip || 0).then(results => {
        //artificial delay for testing purposes
        setTimeout(() => {
          resolve(results)
        }, 2000)
      }).catch(error => {
        reject(messages.databaseException)
      })
    })
  }
}