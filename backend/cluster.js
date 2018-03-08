const cluster = require("cluster")
const os = require("os")

const logger = require("./logger")

if (cluster.isMaster) {
  
  let cpuCount = os.cpus().length
  for (let i = 0; i < cpuCount; i++) {
    let worker = cluster.fork()

    worker.on("online", () => {
      logger.log(`Worker ${worker.process.pid} has started`)
    })

    worker.on("error", (error) => {
      logger.log(`Worker ${worker.process.pid} has encountered an error ${JSON.stringify(error)}`)
    })

    worker.on("exit", (worker, code, signal) => {
      if (worker.exitedAfterDisconnect) {
        return logger.log(`Worker ${worker.process.pid} has exited voluntarily with a code ${code} & signal ${signal}`)
      }

      logger.log(`Worker ${worker.process.pid} has exited with a code ${code} & signalr ${signal}, respawning...`)
      cluster.fork()
    })
  }
} else {
  require("./webServer")
}