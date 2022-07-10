const { RESTDataSource } = require('apollo-datasource-rest')
const { UserInputError } = require('apollo-server')

class ArtistService extends RESTDataSource {
  constructor() {
    // Always call super()
    super()
    // Sets the base URL for the REST API
    this.baseURL = process.env.ARTISTS_URL
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

  async getArtists(limit = 5) {
    const res = await this.get('', { limit })
    
    return res.items
  }

  async getArtist(id) {
    if (id == null) {
      throw new SyntaxError('you should send id')
    }

    const res = await this.get(`/${id}`)

    return res || null
  }

  async createArtist(fields) {
    this._checkToken()

    const res = await this.post(
      '', // path
      fields, // request body
    )

    return res
  }

  async deleteArtist(id) {
    this._checkToken()

    const artist = await this.getArtist(id)

    if (artist == null) {
      throw new UserInputError(
        'can\'t delete artist who doesn\'t '
        + 'exist, try another id'
      )
    }

    const { deletedCount } = await this.delete(`/${id}`)

    if (!deletedCount) {
      throw new Error('something went wrong on server')
    }

    return artist
  }
}

module.exports = {
  ArtistService
}
