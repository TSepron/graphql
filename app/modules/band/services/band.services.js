const { RESTDataSource } = require('apollo-datasource-rest')
const { AuthenticationError, UserInputError } = require('apollo-server')

class BandService extends RESTDataSource {
  constructor() {
    // Always call super()
    super()
    // Sets the base URL for the REST API
    this.baseURL = process.env.BAND_URL
  }

  willSendRequest(request) {
    if (this.context.token) {
      request.headers.set(
        'Authorization', 
        `Bearer ${this.context.token}`
      )
    }
  }

  _checkToken() {
    if (!this.context.token) {
      throw new AuthenticationError('you must login firstly')
    }
  }

  async getBands(limit = 5) {
    const res = await this.get('', { limit })

    return res.items
  }

  async getBand(id) {
    if (id == null) {
      throw new SyntaxError('you should send id')
    }

    const res = await this.get(`/${id}`)

    return res || null
  }

  async createBand(fields) {
    if (!this.context.token) {
      throw new AuthenticationError('you must login firstly')
    }

    const res = await this.post(
      '', // path
      fields, // request body
    )

    return res
  }

  async deleteBand(id) {
    this._checkToken()

    const band = await this.getBand(id)

    if (band == null) {
      throw new UserInputError(
        'can\'t delete band which doesn\'t '
        + 'exist, try another id'
      )
    }

    const { deletedCount } = await this.delete(`/${id}`)

    if (!deletedCount) {
      throw new Error('something went wrong on server')
    }

    return band
  }

  async updateBand(id, fields) {
    this._checkToken()

    const res = await this.put(`/${id}`, fields)

    if (!res) {
      throw new UserInputError(
        'can\'t update band which doesn\'t '
        + 'exist, try another id'
      )
    }

    return res
  }
}

module.exports = {
  BandService
}
