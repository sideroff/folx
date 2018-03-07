class Logger {
  log(message) {
    console.log(message)
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