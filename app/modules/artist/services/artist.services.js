const { RESTDataSource } = require('apollo-datasource-rest')

class ArtistService extends RESTDataSource {
  constructor() {
    // Always call super()
    super()
    // Sets the base URL for the REST API
    this.baseURL = process.env.ARTISTS_URL
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
}

module.exports = {
  ArtistService
}
