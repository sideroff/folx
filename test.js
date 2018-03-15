let promises = []

//promises.push(require("./backend/connectors/cache").initialize())
promises.push(require("./backend/connectors/database").initialize())

Promise.all(promises)
  .then(results => {
    let serviceProviders = require("./backend/serviceProviders")
    let serviceRequest = {
      provider: "users",
      service: "login",
      params: {}
    }

    return Promise.resolve()//serviceProviders.executeService(serviceRequest)
  }).then(result => {
    console.log(`service result ${JSON.stringify(result)}`)

    let promises2 = []
    //promises2.push(require("./backend/connectors/cache").close())
    promises2.push(require("./backend/connectors/database").close())

    return Promise.all(promises)
  }).then(() => {
    console.log('all is ended')
  }).catch(error => {
    console.log(`error ${JSON.stringify(error)}`)
  })