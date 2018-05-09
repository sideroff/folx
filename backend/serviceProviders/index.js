const messages = require("./../messages")
const accessRights = require("./../../config").webServer.accessRights


const providers = {
  users: require("./users"),
  ads: require("./ads")
}

module.exports = {
  executeService: (serviceRequest, res) => {
    return new Promise((resolve, reject) => {
      if (!providers[serviceRequest.provider] || typeof providers[serviceRequest.provider][serviceRequest.service] !== "function") {
        return reject(messages.invalidServiceRequest)
      }

      let requiredAccessRightRole = providers[serviceRequest.provider].accessRights[serviceRequest.service]

      if (requiredAccessRightRole !== accessRights.guest || serviceRequest.session.role < requiredAccessRightRole) {
        return reject(Object.assign({ requiredAccessRight }, messages.serviceAccessDenied))
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