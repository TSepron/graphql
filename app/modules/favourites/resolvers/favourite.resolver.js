const { getId } = require("../../../utils")

const favouritesResolver = {
  Mutation: {
    addTrackToFavourites: async (_, { trackId }, { dataSources }) => {
      return dataSources.favouritesService.addTrackToFavourites(trackId)
    },
    addBandToFavourites: async (_, { bandId }, { dataSources }) => {
      return dataSources.favouritesService.addBandToFavourites(bandId)
    },
    addArtistToFavourites: async (_, { artistId }, { dataSources }) => {
      return dataSources.favouritesService.addArtistToFavourites(artistId)
    },
    addGenreToFavourites: async (_, { genreId }, { dataSources }) => {
      return dataSources.favouritesService.addGenreToFavourites(genreId)
    },
  },
  Favourites: {
    id: getId,
    artists: async (favourites, __, { dataSources }) => {
      return favourites.artistsIds.map(artistId =>
        dataSources.artistService.getArtist(artistId)
      )
    },
    bands: async (favourites, __, { dataSources }) => {
      return favourites.bandsIds.map(bandId =>
        dataSources.bandService.getBand(bandId)
      )
    },
    tracks: async (favourites, __, { dataSources }) => {
      return favourites.tracksIds.map(trackId =>
        dataSources.trackService.getTrack(trackId)
      )
    },
    genres: async (favourites, __, { dataSources }) => {
      return favourites.genresIds.map(genreId =>
        dataSources.genreService.getGenre(genreId)
      )
    },
  }
}

module.exports = {
  favouritesResolver
}
