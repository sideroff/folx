const messages = require("./../messages")
const db = require("./../connectors/database")
const logger = require("./../logger")



module.exports = {
  create: (params, res) => {
    return new Promise((resolve, reject) => {

      for (let k in params) {
        if (typeof params[k] === "string") {
          params[k] = params[k].trim()
        }
      }

      if (typeof params.name !== "string" || params.name.length === 0) {
        return reject(messages.adNameIsRequired)
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
        reject(messages.databaseException)
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
  }
}