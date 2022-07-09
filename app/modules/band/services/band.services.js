const { RESTDataSource } = require('apollo-datasource-rest')

class BandService extends RESTDataSource {
  constructor() {
    // Always call super()
    super()
    // Sets the base URL for the REST API
    this.baseURL = 'http://localhost:3003/v1/bands'
  }

  async getBands(limit = 5) {
    const res = await this.get('', { limit })
    
    return res.items
  }
}

module.exports = {
  BandService
}
