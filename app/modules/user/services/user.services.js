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

  async loginUser(email, password) {
    const res = await this.post(
      '/login', // path
      { email, password }, // request body
    )

    // empty obj to can destruct jwt from it in next step
    return res || {}
  }

  async getJWT(jwt) {
    if (!jwt) {
      throw new AuthenticationError('email or password is incorrect')
    }

    return jwt
  }
}

module.exports = {
  UserService
}
