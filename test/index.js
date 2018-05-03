
const config = require("./../config")
const logger = require("./../backend/logger")

const cache = require("./../backend/connectors/cache")
const db = require("./../backend/connectors/database")
// https://github.com/istanbuljs/nyc

// tests will be run by heroku using the postbuild hook they provide (check package.json > scripts),
// that means that if the tests fail, the build will too.
var assert = require('assert')

describe("temporary", function () {
  //allowed time for each test
  this.timeout(config.tests.timeout)
  let serviceProviders

  // runs before all tests in this block
  before(done => {
    let promises = []

    promises.push(cache.initialize())
    promises.push(db.initialize())

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

    promises.push(cache.close())
    promises.push(db.close())

    Promise.all(promises).then(results => {
      done()
    }).catch(error => {
      done(error)
    })
  })

  describe('serviceProviders', () => {
    require('./serviceProviders')
  })
})
