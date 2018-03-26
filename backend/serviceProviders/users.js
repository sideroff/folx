var uuid = require("uuid-v4");
const utils = require("./../utils")
const config = require("./../../config")
const exceptions = require("./../exceptions")
const db = require("./../connectors/database")
const cache = require("./../connectors/cache")
const logger = require("./../logger")


module.exports = {
  login: (params, res) => {
    return new Promise((resolve, reject) => {
      db.models.User.findOne({ username: params.username }).then(user => {
        if (utils.sha256(params.password, user.salt) !== user.passwordHash) {
          return reject(exceptions.invalidCredentials)
        }
        let userData = { username: user.username, email: user.email }
        let token = uuid()
        cache.setSession(token, userData).then(() => {
          resolve(Object.assign(userData, { token }))
        }).catch(error => {
          logger.log(`An error occured while saving a user session: ${JSON.stringify(error)}`)
          return reject(exceptions.serverError)
        })

      }).catch(error => {
        reject(exceptions.invalidCredentials)
      })
    })
  },
  register: (params, res) => {
    return new Promise((resolve, reject) => {
      //param checks
      if (!(params.username && typeof params.username === "string"
        && params.password && typeof params.password === "string"
        && params.password === params.confirmPassword)) {
        return reject(exceptions.invalidServiceRequestParams)
      }

      params.salt = utils.generateRandomString(config.webServer.passwordSaltLength)
      params.passwordHash = utils.sha256(params.password, params.salt)

      new db.models.User(params).save().then(result => {
        resolve("Registration was successful")
      }).catch(error => {
        if (error.code === 11000) {
          let [fullMatch, constraintType, database, table, field] = error.message.match(/^(\w+)[\w\s]+\s([\w]+):\s(.+)\.(.+)\.\$(.+)_[\d]+/g)
          logger.log(JSON.stringify(error))
        }
        reject(exceptions.databaseException)
      })
    })
  }
}