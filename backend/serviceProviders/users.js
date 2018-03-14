
const utils = require("./../utils")
const config = require("./../../config")
const exceptions = require("./../exceptions")
const db = require("./../connectors/database")

module.exports = {
  login: (params, res) => {
    return Promise.resolve({ username: "gosho", token: "1111-111111-11111111-1111" })
  },
  register: (params, res) => {
    return new Promise((resolve, reject) => {
      //param checks
      if (!(params.username && typeof params.username === "string"
        && params.password && typeof params.password === "string")) {
        return reject(exceptions.invalidParams)
      }

      let salt = utils.generateRandomString(config.webServer.passwordSaltLength)
      let passwordHash = utils.sha256(params.password, salt)

      new db.models.User(params).save().then(result => {
        resolve("Registration was successful")
      }).catch(error => {
        reject(exceptions.databaseException)
      })
    })
  }
}