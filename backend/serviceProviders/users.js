var uuid = require("uuid-v4");
const utils = require("./../utils")
const config = require("./../../config")
const messages = require("./../messages")
const db = require("./../connectors/database")
const cache = require("./../connectors/cache")
const logger = require("./../logger")
const userSchema = require("./../connectors/database/models").User.schema
const accessRights = config.webServer.accessRights

module.exports = {
  accessRights: {
    login: accessRights.guest,
    register: accessRights.guest,
  },
  login: (params, res) => {
    return new Promise((resolve, reject) => {
      db.models.User.findOne({ username: params.username }).then(user => {
        if (utils.sha256(params.password, user.salt) !== user.passwordHash) {
          return reject(messages.invalidCredentials)
        }

        let usersData = {
          username: user.username,
          email: user.email,
          role: user.role,
          id: user.id,          
        }

        let token = uuid()
        user.token = token
        cache.setSession(token, usersData).then(() => {
          let sessionExpiresOn = Date.now() + config.webServer.cookieLifetimeInMs
          let expireDate = new Date(sessionExpiresOn).toUTCString()

          res.setHeader("Set-Cookie", `token=${token}; Expires=${expireDate}; HttpOnly`)
          usersData.sessionExpiresOn = sessionExpiresOn

          resolve(usersData)
        }).catch(error => {
          logger.log(`An error occured while saving a user session: ${JSON.stringify(error)}`)
          return reject(messages.serverError)
        })

      }).catch(error => {
        reject(messages.invalidCredentials)
      })
    })
  },
  register: (params, res) => {
    return new Promise((resolve, reject) => {


      if (!params.username || typeof params.username !== "string") {
        return reject(messages.invalidUsername)
      } else if (!params.password || typeof params.password !== "string") {
        return reject(messages.invalidPassword)
      } else if (params.password !== params.confirmPassword) {
        return reject(messages.invalidConfirmPassword)
      }

      params.salt = utils.generateRandomString(config.webServer.passwordSaltLength)
      params.passwordHash = utils.sha256(params.password, params.salt)

      new db.models.User(params).save().then(result => {
        resolve(messages.registrationSuccessful)
      }).catch(error => {
        reject(error)
      })
    })
  }
}