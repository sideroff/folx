// let promises = []

// //promises.push(require("./backend/connectors/cache").initialize())
// promises.push(require("./backend/connectors/database").initialize())

// Promise.all(promises)
//   .then(results => {
//     let serviceProviders = require("./backend/serviceProviders")
//     let serviceRequest = {
//       provider: "users",
//       service: "login",
//       params: {}
//     }

//     return Promise.resolve()//serviceProviders.executeService(serviceRequest)
//   }).then(result => {
//     console.log(`service result ${JSON.stringify(result)}`)

//     let promises2 = []
//     //promises2.push(require("./backend/connectors/cache").close())
//     promises2.push(require("./backend/connectors/database").close())

//     return Promise.all(promises)
//   }).then(() => {
//     console.log('all is ended')
//   }).catch(error => {
//     console.log(`error ${JSON.stringify(error)}`)
//   })

// // function isPalindrome(str) {
// //   return str.toLowerCase().replace(/\W/g, '').split('').reverse().join('') === str.toLowerCase().replace(/\W/g, '')
// // }

// // let str = "A Santa dog lived as a devil God at NASA."
// // console.log(isPalindrome(str))


// // function sum(a, b) {
// //   if (b) {
// //     return sum
// //   }
// //   return arguments.reduce((a, c) => {a+c}, 0)
// // }

// // console.log(sum(2, 3))
// // console.log(sum(2)(3))




const logger = require("./backend/logger")
const db = require("./backend/connectors/database")

db.initialize().then(() => {
  logger.log(1)
  return db.close()
}).then(() => {
  logger.log('done')
}).catch(e => {
  logger.log(`error ${JSON.stringify(e)}`)
})

process.on("unhandledRejection", (error) => {
  logger.log(`unhandled rejection ${JSON.stringify(error)}`)
})