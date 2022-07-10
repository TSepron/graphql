const { RESTDataSource } = require('apollo-datasource-rest')
const { AuthenticationError } = require('apollo-server')

class UserService extends RESTDataSource {
  constructor() {
    // Always call super()
    super()
    // Sets the base URL for the REST API
    this.baseURL = process.env.USERS_URL
  }

  async getUser(id) {
    if (id == null) {
      throw new SyntaxError('you should send id')
    }

    const res = await this.get(`/${id}`)

    return res || null
  }

  async registerUser(registerUserFields) {
    const res = await this.post(
      '/register', // path
      { ...registerUserFields }, // request body
    )

    return res
  }

  async loginUser(email, password) {
    const res = await this.post(
      '/login', // path
      { email, password }, // request body
    )

    if (!res) {
      throw new AuthenticationError('can\'t find email')
    }

    // empty obj to be able to destruct jwt from it in next step
    return res || {}
  }

  async saveJWT(jwt) {
    if (!jwt) {
      throw new AuthenticationError('email or password is incorrect')
    }

    // don't work hm...
    // this.context.setHeaders.push({ key: 'accessToken', value: "Bearer 71D50F9987529" })
    // console.log(this.context.setHeaders)

    this.context.setCookies.push({ name: 'jwt', value: jwt })

    return jwt
  }
}

module.exports = {
  UserService
}
