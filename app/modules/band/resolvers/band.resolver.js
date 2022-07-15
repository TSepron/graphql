const { getId } = require("../../../utils")

const bandResolver = {
  Query: {
    bands: async (_, { limit, token }, { dataSources }) => {
      return dataSources.bandService.getBands(limit)
    },
    band: async (_, { id }, { dataSources }) => {
      return dataSources.bandService.getBand(id)
    },
  },
  Mutation: {
    createBand: async (_, { createBandFields }, { dataSources }) => {
      return dataSources.bandService.createBand(createBandFields)
    },
    deleteBand: async (_, { bandId }, { dataSources }) => {
      return dataSources.bandService.deleteBand(bandId)
    },
    updateBand: async (_, { bandId, updateBandFields }, { dataSources }) => {
      return dataSources.bandService.updateBand(bandId, updateBandFields)
    },
  },
  Band: {
    id: getId,
    genres: async (band, __, { dataSources }) => {
      return band.genresIds.map(genreId =>
        dataSources.genreService.getGenre(genreId)
      )
    },
  },
  Member: {
    artist: async (member, __, { dataSources }) => {
      const artistId = member.artist
      return dataSources.artistService.getArtist(artistId)
    },
  },
}

module.exports = {
  bandResolver
}
