const http = require("http")
const path = require("path")
const fs = require("fs")

const exceptions = require("./exceptions")
const config = require("./../config")
const logger = require("./logger")
const utils = require("./utils")
const cache = require("./connectors/cache")
const db = require("./connectors/database")

const serviceProviders = require("./serviceProviders")

function handlePostRequest(req, res) {
  return new Promise((resolve, reject) => {
    let body = ""

    req.on("data", data => {
      body += data
    })

    req.on("end", () => {

      try {
        body = JSON.parse(body)
      } catch (error) {
        return reject(exceptions.badRequest)
      }

      let serviceRequest = utils.parseServiceRequest(body)
      if (!serviceRequest) {
        return reject(exceptions.invalidServiceRequest)
      }

      serviceProviders.executeService(serviceRequest, res).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })

  })
}

function handleGetRequest(req, res) {
  return handleFileRequest(req, res).then(result => {
    res.writeHead(200, { "Content-Type": result.mime || "text/plain" })

    result.buffer.on("end", () => {
      res.end()
    })

    result.buffer.pipe(res)
  }).catch(error => {
    res.writeHead(error.httpCode || 200)

    if (utils.isNotStandartError(error)) {
      error = exceptions.friendlyError
    }

    error = utils.toStandartError(error)
    let response = utils.stringifyServiceResponse(error)

    res.write(response)
    res.end()
  })
}


function handleFileRequest(req, res) {
  return new Promise((resolve, reject) => {
    let filename = req.url
    let ext = path.extname(filename)

    if (ext.length === 0) {
      filename = "index.html"
      ext = ".html"
    }

    let mime = config.webServer.publiclyAccessibleFileExtToMime[ext]
    if (!mime) {
      return reject(exceptions.invalidFile)
    }

    let filePath = path.normalize(config.webServer.publicFolderPath + filename)

    if (!utils.isSubdirectoryOf(filePath, config.webServer.publicFolderPath)) {
      return reject(exceptions.invalidFile)
    }

    fs.stat(filePath, (error, stats) => {
      if (error) {
        return reject(exceptions.invalidFile)
      }

      let buffer = fs.createReadStream(filePath)
      resolve({ buffer, mime })
    })
  })
}


function requestListener(req, res) {
  let handler

  if (req.method === "GET") {
    return handleGetRequest(req, res)
  }
  else if (req.method === "POST" && req.url.startsWith("/api")) {
    handler = handlePostRequest
  } else {
    handler = (req, res) => Promise.reject(exceptions.badRequest)
  }

  handler(req, res).then(data => {
    let result = utils.toStandartResult(data)
    let response = utils.stringifyServiceResponse(result)

    res.writeHead(200)
    res.write(response)
    res.end()

  }).catch(error => {
    let response

    res.writeHead(error.httpCode || 200)

    if (utils.isNotStandartError(error)) {
      logger.log(`Request handler responded with unhandled error. ${JSON.stringify(error)}`)
      error = exceptions.friendlyError
    }

    error = utils.toStandartError(error)
    response = utils.stringifyServiceResponse(error)

    res.write(response)
    res.end()
  })
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

promises.push(db.initialize())
promises.push(cache.initialize())
promises.push(initialize())

Promise.all(promises).then(results => {
  logger.log(`Application ${process.pid} has been initialized successfully`)
}).catch(error => {
  logger.log(`Application ${process.pid} has encountered an error ${JSON.stringify(error)}`)
  // TODO: kill all connections
  process.kill(process.pid, 0)
})