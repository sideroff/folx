const http = require('http')

const config = require("./../config")
const logger = require("./logger")

function requestListener(req, res) {
  res.writeHead(200)
  res.write("Hello World!")
  res.end()
}

function initialize() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(requestListener)

    server.on("error", error => {
      logger.log(`Web server encountered an error ${error}`)
      reject(error)
    })

    server.listen(config.webServer.port, () => {
      logger.log(`Web server has started successfully on port ${config.webServer.port}`)
      resolve()
    })
  })
}

let promises = []

//promises.push(db.initialize())
//promises.push(cache.initialize())
promises.push(initialize())

Promise.all(promises).then(results => {
  logger.log(`Application ${process.pid} has been initialized successfully`)
}).catch(error => {
  logger.log(`Application ${process.pid} has encountered an error ${JSON.stringify(error)}`)
})

