const { RESTDataSource } = require('apollo-datasource-rest')

class AlbumService extends RESTDataSource {
  constructor() {
    // Always call super()
    super()
    // Sets the base URL for the REST API
    this.baseURL = process.env.ALBUMS_URL
  }

  willSendRequest(request) {
    if (this.context.token) {
      request.headers.set(
        'Authorization',
        `Bearer ${this.context.token}`
      )
    }
  }

  async getAlbums(limit = 5) {
    const res = await this.get('', { limit })
    
    return res.items
  }

  async getAlbum(id) {
    if (id == null) {
      throw new SyntaxError('you should send id')
    }

    const res = await this.get(`/${id}`)

    return res || null
  }

  async createAlbum(fields) {
    if (!this.context.token) {
      throw new AuthenticationError('you must login firstly')
    }

    const res = await this.post(
      '', // path
      fields, // request body
    )

    return res
  }
}

module.exports = {
  AlbumService
}
