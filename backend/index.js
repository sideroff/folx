const http = require('http')

const config = require("./../config")
const logger = require("./logger")

function requestListener(req, res) {
  res.writeHead(200)
  res.write("Hello World!")
  res.end()
}

const server = http.createServer(requestListener)

server.listen(config.webServer.port, () => {
  logger.log(`Web server has started successfully on port ${config.webServer.port}`)
})