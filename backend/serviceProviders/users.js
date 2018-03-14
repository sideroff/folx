
const utils = require("./../utils")
const config = require("./../../config")

module.exports = {
  login: (params, res) => {
    return Promise.resolve({ username: "gosho", token: "1111-111111-11111111-1111" })
  },
  register: (params, res) => {
    //param checks

    let salt = utils.generateRandomString(config.webServer.passwordSaltLength)
    let passwordHash = utils.sha256(params.password, salt)
  }
}