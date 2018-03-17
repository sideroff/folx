const path = require("path")
const crypto = require("crypto")

const exceptions = require("./exceptions")
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
      response = JSON.stringify({ error: exceptions.friendlyError })
    }

    return response
  },
  isSubdirectoryOf: (child, parent) => {
    if (child === parent) return false

    let parentTokens = parent.split(path.sep).filter(i => i.length)
    let childTokens = child.split(path.sep)

    logger.log(`parent ${JSON.stringify(parentTokens)} \n childTokens ${JSON.stringify(childTokens)}`)

    return parentTokens.every((t, i) => childTokens[i] === t)
  },
  isNotStandartError: error => {
    return !error || typeof error !== "object" || !exceptions[error.code]
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
  }
}