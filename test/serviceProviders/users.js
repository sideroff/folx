const assert = require("assert")
const serviceProviders = require("./../../backend/serviceProviders")
const logger = require("./../../backend/logger")
const userSchema = require("./../../backend/connectors/database/models").User.schema
const messages = require("./../../backend/messages")
const db = require("./../../backend/connectors/database")

const defaultRegisterServiceRequest = {
  provider: "users",
  service: "register",
  params: {}
}

const defaultTestUserData = {
  username: "testUser",
  password: "testPassword",
  confirmPassword: "testPassword",
  email: "testMail@gmail.com"
}

describe("register", () => {
  let serviceCall
  let testUserData

  before(done => {
    db.models.User.remove({ username: defaultTestUserData.username }).then(() => {
      logger.log("Testing default state set up successfully.")
      done()
    }).catch(error => {
      logger.log('Error encountered while trying to set up the testing default state')
      done(error)
    })
  })

  beforeEach(() => {
    serviceCall = Object.assign({}, defaultRegisterServiceRequest)
    testUserData = Object.assign({}, defaultTestUserData)
  })

  it("should save user to database when data is correct", done => {
    serviceCall.params = testUserData
    serviceProviders.executeService(serviceCall).then(result => {
      return db.models.User.findOne({ username: testUserData.username })
    }).then(entity => {
      if (entity) {
        return done()
      }
      done(new Error("user was not saved"))
    }).catch(error => {
      done(error)
    })
  })

  it(`should reject with username too short when username is less than ${userSchema.username.minLength} chars long`, done => {
    serviceCall.params = testUserData
    serviceCall.params.username = "a".repeat(userSchema.username.minLength - 1)
    serviceProviders.executeService(serviceCall).then(result => {
      return done(new Error("Username is not validated for minimum character requirements."))
    }).catch(error => {
      if (error === messages.usernameTooShort) {
        return done()
      }
      done(new Error(`The register service did not respond with the usernameTooShort message when username was below ${userSchema.username.minLength} characters long`))
    })
  })

  it(`should reject with username too long when username is more than ${userSchema.username.minLength} chars long`, done => {
    serviceCall.params = testUserData
    serviceCall.params.username = "a".repeat(userSchema.username.maxLength + 1)
    serviceProviders.executeService(serviceCall).then(result => {
      return done(new Error("Username is not validated for maximum character requirements."))
    }).catch(error => {
      if (error === messages.usernameTooLong) {
        return done()
      }
      done(new Error(`The register service did not respond with the usernameTooLong message when username was above ${userSchema.username.maxLength} characters long`))
    })
  })
})
