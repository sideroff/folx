// https://github.com/istanbuljs/nyc

var assert = require('assert')

describe("temporary", function () {
  this.timeout(5000)
  let serviceProviders

  // runs before all tests in this block
  before(done => {
    let promises = []

    promises.push(require("./../backend/connectors/cache").initialize())
    promises.push(require("./../backend/connectors/database").initialize())

    Promise.all(promises).then(results => {
      serviceProviders = require("./../backend/serviceProviders")
      done()
    }).catch(error => {
      done(error)
    })
  })

  // runs after all tests in this block
  after(function (done) {
    let promises = []

    promises.push(require("./../backend/connectors/cache").close())
    promises.push(require("./../backend/connectors/database").close())

    Promise.all(promises).then(results => {
      done()
    }).catch(error => {
      done(error)
    })
  })

  // runs before each test in this block
  beforeEach(function () {
  })

  // runs after each test in this block
  afterEach(function () {
    console.log(3)
  })

  describe('users', () => {
    describe('login', () => {
      let serviceRequest = {
        provider: "users",
        service: "login",
        params: {

        }
      }
      it('should resolve', done => {
        serviceProviders.executeService(serviceRequest).then(() => {
          done()
        }).catch(error => {
          done(error)
        })
      })
    })
  })
})
