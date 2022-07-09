const { getId } = require("../../../utils")

const albumResolver = {
  Query: {
    albums: async (_, { limit }, { dataSources }) => {
      return dataSources.albumService.getAlbums(limit)
    },
    album: async (_, { id }, { dataSources }) => {
      return dataSources.albumService.getAlbum(id)
    },
  },
  Album: {
    id: getId,
  }
}

module.exports = {
  albumResolver
}
