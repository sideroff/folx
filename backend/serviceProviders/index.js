const messages = require("./../messages")

const providers = {
  users: require("./users")
}

module.exports = {
  executeService: (serviceRequest, res) => {
    return new Promise((resolve, reject) => {
      if (!providers[serviceRequest.provider] || typeof providers[serviceRequest.provider][serviceRequest.service] !== "function") {
        return reject(messages.invalidServiceRequest)
      }

      let handler = providers[serviceRequest.provider][serviceRequest.service]

      handler(serviceRequest.params, res).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}