const { RESTDataSource } = require('apollo-datasource-rest')
const { AuthenticationError } = require('apollo-server')

class FavouritesService extends RESTDataSource {
  constructor() {
    // Always call super()
    super()
    // Sets the base URL for the REST API
    this.baseURL = process.env.FAVOURITES_URL
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

  async _addToFavourites(id, type) {
    this._checkToken()

    const res = await this.put('/add', {
      type,
      id
    })

    return res
  }

  async addTrackToFavourites(id) {
    const res = await this._addToFavourites(id, 'tracks')
    return res
  }

  async addBandToFavourites(id) {
    const res = await this._addToFavourites(id, 'bands')
    return res
  }

  async addArtistToFavourites(id) {
    const res = await this._addToFavourites(id, 'artists')
    return res
  }

  async addGenreToFavourites(id) {
    const res = await this._addToFavourites(id, 'genres')
    return res
  }
}

module.exports = {
  FavouritesService
}
