const path = require("path")
const crypto = require("crypto")

const messages = require("./messages")
const logger = require("./logger")

module.exports = {
  toStandartError: error => { return { error } },
  toStandartResult: result => { return { result } },
  parseServiceRequest: body => {
    if (typeof body.method !== "string" || body.method.indexOf(".") < 0) {
      return
    }

    let [provider, service] = body.method.split(".")

    return {
      provider,
      service,
      params: body.params
    }
  },
  stringifyServiceResponse: response => {
    try {
      response = JSON.stringify(response)
    } catch (error) {
      logger.log(`Request handler responded with an unstrigifiable response (most probably circular reference). Debug necessary.`)
      response = JSON.stringify({ error: messages.friendlyError })
    }

    return response
  },
  isSubdirectoryOf: (child, parent) => {
    if (child === parent) return false

    let parentTokens = parent.split(path.sep).filter(i => i.length)
    let childTokens = child.split(path.sep).filter(i => i.length)

    return parentTokens.every((t, i) => childTokens[i] === t)
  },
  isNotStandartError: error => {
    return !error || typeof error !== "object" || !messages[error.code]
  },
  generateRandomString: (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length)
  },
  sha256: (str, salt) => {
    let hash = crypto.createHmac("sha256", salt)
    hash.update(str)

    return hash.digest("hex")
  },
  parseMongooseErrorMessage: (msg) => {

    let rgx = /^(\w+)[\w\s]+\s([\w]+):\s(.+)\.(.+)\.\$(.+)_[\d]+/g
    let values

    try {
      values = rgx.exec(msg)
    } catch (error) {
      return
    }

    let [fullMatch, errorCode, constraintType, database, table, field] = values

    return { fullMatch, errorCode, constraintType, database, table, field }
  },
  capitalizeFirstLetter: (str) => {
    return typeof str === "string" ? str.charAt(0).toUpperCase() + str.slice(1) : ""
  },
  getRandomInteger: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}