export default {
  requestToServer: (method, params) => {
    return new Promise((resolve, reject) => {

      let request = new Request(
        '/api',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({ method, params })
        })

      fetch(request).then(fetchResponse => {
        if (!fetchResponse.ok) {
          return reject(fetchResponse.statusText)
        }

        return fetchResponse.json()
      }).then(response => {
        if (response.error) {
          return reject(response.error)
        }

        resolve(response.result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}