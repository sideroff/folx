const assert = require('assert')

const serviceProviders = require("./../../backend/serviceProviders")



const defaultRegisterServiceCall = {
  provider: "ads",
  service: "create",
  params: {}
}

const defaultTestAdData = {
  name: "testAdName",
  description: "testAdDescription",
  price: 420
}

describe('create', () => {
  let serviceCall
  let testAdData

  beforeEach(() => {
    serviceCall = Object.assign({}, defaultRegisterServiceCall)
    testAdData = Object.assign({}, defaultTestAdData)
  })

  it('should resolve', done => {
    serviceCall.params = testAdData
    serviceProviders.executeService(serviceCall).then(result => {
      done()
    }).catch(error => done)
  })
})