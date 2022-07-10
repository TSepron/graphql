const { RESTDataSource } = require('apollo-datasource-rest')
const { AuthenticationError, UserInputError } = require('apollo-server')

class TrackService extends RESTDataSource {
  constructor() {
    // Always call super()
    super()
    // Sets the base URL for the REST API
    this.baseURL = process.env.TRACK_URL
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

  async getTracks(limit = 5) {
    const res = await this.get('', { limit })
    
    return res.items
  }

  async getTrack(id) {
    if (id == null) {
      throw new SyntaxError('you should send id')
    }

    const res = await this.get(`/${id}`)

    return res || null
  }

  async createTrack(fields) {
    this._checkToken()

    const res = await this.post(
      '', // path
      fields, // request body
    )

    return res
  }

  async deleteTrack(id) {
    this._checkToken()

    const track = await this.getTrack(id)

    if (track == null) {
      throw new UserInputError(
        'can\'t delete track which doesn\'t '
        + 'exist, try another id'
      )
    }

    const { deletedCount } = await this.delete(`/${id}`)

    if (!deletedCount) {
      throw new Error('something went wrong on server')
    }

    return track
  }

  async updateTrack(id, fields) {
    this._checkToken()

    const res = await this.put(`/${id}`, fields)

    if (!res) {
      throw new UserInputError(
        'can\'t update track which doesn\'t '
        + 'exist, try another id'
      )
    }

    return res
  }
}

module.exports = {
  TrackService
}
