// tests for the users service provider

const assert = require("assert")
const serviceProviders = require("./../../backend/serviceProviders")
const logger = require("./../../backend/logger")

const db = require("./../../backend/connectors/database")

const defaultServiceRequrest = {
  provider: "",
  service: "",
  params: {}
}

const testUserData = {
  username: "testUser",
  password: "testPassword",
  confirmPassword: "testPassword",
  email: "ivan.sideroff@gmail.com"
}

describe('users', () => {
  describe("register", () => {

    const defaultRegisterServiceRequest = {
      provider: "users",
      service: "register",
      params: {}
    }

    before(done => {
      db.models.User.remove({ username: testUserData.username }, error => {
        if (error) {
          logger.log('Error encountered while trying to set up the testing default state')
          throw error
        }
        logger.log("Testing default state set up successfully.")
        done()
      })
    })

    it("should save user when data is correct", done => {
      let serviceCall = Object.assign({}, defaultRegisterServiceRequest)

      serviceCall.params = testUserData
      serviceProviders.executeService(serviceCall).then(result => {
        return db.models.User.findOne({ username: testUserData.username })
      }).then(entity => {
        if (entity) {
          return done()
        }
        done(new Error("user was not saved"))
      }).catch(error => {
        console.log('ayy error ' + JSON.stringify(error))
        done(error)
      })
    })
  })
})