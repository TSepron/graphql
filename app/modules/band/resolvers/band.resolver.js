const { getId } = require("../../../utils")

const bandResolver = {
  Query: {
    bands: async (_, { limit, token }, { dataSources }) => {
      console.log(token)
      return dataSources.bandService.getBands(limit)
    },
    band: async (_, { id }, { dataSources }) => {
      return dataSources.bandService.getBand(id)
    },
  },
  Band: {
    id: getId,
  }
}

module.exports = {
  bandResolver
}
