class Logger {
  log() {
    console.log.apply(console, [...arguments, process.pid])
  }
}

let instance

function getInstance() {
  if (!instance) {
    instance = new Logger()
  }

  return instance
}

module.exports = getInstance()