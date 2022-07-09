const { getId } = require("../../../utils")

const bandResolver = {
  Query: {
    bands: async (_, { limit }, { dataSources }) => {
      return dataSources.bandService.getBands(limit)
    },
  },
  Band: {
    id: getId,
  }
}

module.exports = {
  bandResolver
}
