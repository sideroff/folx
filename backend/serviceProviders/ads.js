
const messages = require("./../messages")
const db = require("./../connectors/database")

module.exports = {
  create: (params, res) => {
    return new Promise((resolve, reject) => {
     
      if (typeof params.name !== "string" || params.name.length === 0) {
        return reject(messages.adNameIsRequired)
      } else if (typeof params.description !== "string" || params.description.length === 0) {
        return reject(messages.adDescriptionIsRequired)
      } else if (typeof params.price !== "number") {
        return reject(messages.adPriceIsRequired)
      }

      

    })
  }
}





