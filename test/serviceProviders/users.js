const assert = require("assert")
const crypto = require("crypto")

const serviceProviders = require("./../../backend/serviceProviders")
const logger = require("./../../backend/logger")
const utils = require("./../../backend/utils")
const userSchema = require("./../../backend/connectors/database/models").User.schema
const messages = require("./../../backend/messages")
const db = require("./../../backend/connectors/database")


const defaultRegisterServiceRequest = {
  provider: "users",
  service: "register",
  params: {},
  session: {}
}

const defaultTestUserData = {
  username: "testUser",
  password: "testPassword",
  confirmPassword: "testPassword",
  email: "testMail@gmail.com"
}

function getRandomValidUser() {
  let user = Object.assign({}, defaultTestUserData)

  user.username = crypto.randomBytes(32).toString("hex").substring(0, utils.getRandomInteger(userSchema.username.minlength[0], userSchema.username.maxlength[0]))
  user.email = crypto.randomBytes(32).toString("hex").substring(0, utils.getRandomInteger(4, 20))

  return user
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
    serviceCall.params = getRandomValidUser()

    serviceProviders.executeService(serviceCall).then(result => {
      return db.models.User.findOne({ username: serviceCall.params.username })
    }).then(entity => {
      if (entity) {
        return done()
      }
      done(new Error("user was not saved"))
    }).catch(error => {
      done(error)
    })
  })

  it('should reject with invalid username if username is missing', done => {
    delete testUserData.username
    serviceCall.params = testUserData

    serviceProviders.executeService(serviceCall).then(result => {
      done(new Error("Username is not validated for missing parameter."))
    }).catch(error => {
      if (error === messages.invalidUsername) {
        return done()
      }
      done(new Error("The service did not respond with the invalidUsername message."))
    })
  })

  it('should reject with invalid username if username is not a string', done => {
    testUserData.username = {}
    serviceCall.params = testUserData

    serviceProviders.executeService(serviceCall).then(result => {
      done(new Error("Username is not validated for missing parameter."))
    }).catch(error => {
      if (error === messages.invalidUsername) {
        return done()
      }
      done(new Error("The service did not respond with the invalidUsername message."))
    })
  })
  it('should reject with invalid password if password is missing', done => {
    delete testUserData.password
    serviceCall.params = testUserData

    serviceProviders.executeService(serviceCall).then(result => {
      done(new Error("Password is not validated for missing parameter."))
    }).catch(error => {
      if (error === messages.invalidPassword) {
        return done()
      }
      done(new Error("The service did not respond with the invalidPassword message."))
    })
  })

  it('should reject with invalid password if password is not a string', done => {
    testUserData.password = {}
    serviceCall.params = testUserData

    serviceProviders.executeService(serviceCall).then(result => {
      done(new Error("Password is not validated for missing parameter."))
    }).catch(error => {
      if (error === messages.invalidPassword) {
        return done()
      }
      done(new Error("The service did not respond with the invalidPassword message."))
    })
  })

  it('should reject with invalid confirm password if confirm password is missing', done => {
    delete testUserData.confirmPassword
    serviceCall.params = testUserData

    serviceProviders.executeService(serviceCall).then(result => {
      done(new Error("Confirm password is not validated for missing parameter."))
    }).catch(error => {
      if (error === messages.invalidConfirmPassword) {
        return done()
      }
      done(new Error("The service did not respond with the invalidConfirmPassword message."))
    })
  })

  it('should reject with invalid confirm password if confirm password is not a string', done => {
    testUserData.confirmPassword = {}
    serviceCall.params = testUserData

    serviceProviders.executeService(serviceCall).then(result => {
      done(new Error("Confirm password is not validated for missing parameter."))
    }).catch(error => {
      if (error === messages.invalidConfirmPassword) {
        return done()
      }
      done(new Error("The service did not respond with the invalidConfirmPassword message."))
    })
  })

  it(`should reject with username too short when username is less than ${userSchema.username.minlength[0]} chars long`, done => {
    serviceCall.params = testUserData
    serviceCall.params.username = "a".repeat(userSchema.username.minlength[0] - 1)

    serviceProviders.executeService(serviceCall).then(result => {
      done(new Error("Username is not validated for minimum character requirements."))
    }).catch(error => {
      if (error &&
        error.code &&
        messages[error.code] === messages.validationError &&
        error.details &&
        error.details.some(e => e === messages.usernameTooShort)) {
        return done()
      }
      done(new Error(`The register service did not respond with the usernameTooShort message when username was below ${userSchema.username.minlength[0]} characters long`))
    })
  })

  it(`should reject with username too long when username is more than ${userSchema.username.maxlength[0]} chars long`, done => {
    serviceCall.params = testUserData
    let times = userSchema.username.maxlength[0] + 1
    serviceCall.params.username = "a".repeat(times)
    console.log('here ' + times)

    serviceProviders.executeService(serviceCall).then(result => {
      return done(new Error("Username is not validated for maximum character requirements."))
    }).catch(error => {
      if (error &&
        error.code &&
        messages[error.code] === messages.validationError &&
        error.details &&
        error.details.some(e => e === messages.usernameTooLong)) {
        return done()
      }
      done(new Error(`The register service did not respond with the usernameTooLong message when username was above ${userSchema.username.maxlength[0]} characters long`))
    })
  })

  it('should reject with duplicate username if username is already taken', done => {
    testUserData.username = 'a'.repeat(userSchema.username.minlength[0] + 1)
    serviceCall.params = testUserData

    serviceProviders.executeService(serviceCall).then(result => {
      return serviceProviders.executeService(serviceCall)
    }).catch(error => {
      if (error === messages.duplicateUserUsername) {
        return done()
      }
      done(new Error(`The register service did not respond with the duplicateUserUsername message when username was already registered`))
    })
  })

  it('should reject with duplicate email if email is already taken', done => {
    testUserData.username = 'b'.repeat(userSchema.username.minlength[0] + 1)
    serviceCall.params = testUserData

    serviceProviders.executeService(serviceCall).then(result => {
      return serviceProviders.executeService(serviceCall)
    }).catch(error => {
      if (error === messages.duplicateUserEmail) {
        return done()
      }
      done(new Error(`The register service did not respond with the duplicateUserEmail message when email was already registered`))
    })
  })
})
