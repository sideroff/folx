// https://github.com/istanbuljs/nyc

// tests will be run by heroku using the postbuild hook they provide (check package.json > scripts),
// that means that if the tests fail, the build will too.
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
  
  describe('serviceProviders', () => {
    require('./serviceProviders')
  })

})
