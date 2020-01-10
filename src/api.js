import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute(method, resource, data) {
    // inject the accessToken for each request
    // let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      // headers: {
      //   Authorization: `Bearer ${accessToken}`
      // }
    }).then(req => {
      return req.data
    })
  },
  getConfigurations() {
    return this.execute('get', '/configuration')
  },
  getConfiguration(id) {
    return this.execute('get', `/configuration/${id}`)
  },
  createConfiguration(data) {
    return this.execute('post', '/configuration', data)
  },
  updateConfiguration(id, data) {
    return this.execute('put', `/configuration/${id}`, data)
  },
  deleteConfiguration(id) {
    return this.execute('delete', `/configuration/${id}`)
  },
}
