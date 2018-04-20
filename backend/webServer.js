const http = require("http")
const path = require("path")
const fs = require("fs")

const messages = require("./messages")
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
        return reject(messages.badRequest)
      }

      let serviceRequest = utils.parseServiceRequest(body)
      if (!serviceRequest) {
        return reject(messages.invalidServiceRequest)
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
      error = messages.friendlyError
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
      return reject(messages.invalidFile)
    }

    let filePath = path.normalize(config.webServer.publicFolderPath + filename)


    if (!utils.isSubdirectoryOf(filePath, config.webServer.publicFolderPath)) {
      return reject(messages.invalidFile)
    }

    fs.stat(filePath, (error, stats) => {
      if (error) {
        return reject(messages.invalidFile)
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
    handler = (req, res) => Promise.reject(messages.badRequest)
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
      error = messages.friendlyError
    }

    error = utils.toStandartError(error)
    response = utils.stringifyServiceResponse(error)

    res.write(response)
    res.end()
  })
}

function initialize() {
  return new Promise((resolve, reject) => {
    //https://blogs.iyogeshjoshi.com/get-a-free-ssl-tls-certificate-for-your-website-and-setting-up-with-nodejs-server-b5189ac8e007
    const server = http.createServer(requestListener)

    server.on("error", error => {
      logger.log(`Web server encountered an error ${JSON.stringify(error)}`)
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

  let closePromises = []

  closePromises.push(db.close())
  closePromises.push(cache.close())

  Promise.all(closePromises).then(() => {
    logger.log("Application shut down gracefully.")
    process.kill(process.pid, 0)
  }).catch(error => {
    logger.log("Application encountered a problem while shutting down. ", JSON.stringify(error))
    process.kill(process.pid, 0)
  })
})