const { getId } = require("../../../utils")

const artistResolver = {
  Query: {
    artists: async (_, { limit }, { dataSources }) => {
      return dataSources.artistService.getArtists(limit)
    },
    artist: async (_, { id }, { dataSources }) => {
      return dataSources.artistService.getArtist(id)
    },
  },
  Artist: {
    id: getId,
  }
}

module.exports = {
  artistResolver
}
