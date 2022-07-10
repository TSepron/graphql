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
  Mutation: {
    createArtist: async (_, { createArtistFields }, { dataSources }) => {
      return dataSources.artistService.createArtist(createArtistFields)
    },
    deleteArtist: async (_, { artistId }, { dataSources }) => {
      return dataSources.artistService.deleteArtist(artistId)
    },
  },
  Artist: {
    id: getId,
    bands: async (artist, __, { dataSources }) => {
      return artist.bandsIds.map(bandId => 
        dataSources.bandService.getBand(bandId)
      )
    },
  }
}

module.exports = {
  artistResolver
}
