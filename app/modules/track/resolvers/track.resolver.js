const { getId } = require("../../../utils")

const trackResolver = {
  Query: {
    tracks: async (_, { limit }, { dataSources }) => {
      return dataSources.trackService.getTracks(limit)
    },
    track: async (_, { id }, { dataSources }) => {
      return dataSources.trackService.getTrack(id)
    },
  },
  Mutation: {
    createTrack: async (_, { createTrackFields }, { dataSources }) => {
      return dataSources.trackService.createTrack(createTrackFields)
    },
  },
  Track: {
    id: getId,
    album: async (track, __, { dataSources }) => {
      const { albumId } = track
      return dataSources.albumService.getAlbum(albumId)
    },
    artists: async (track, __, { dataSources }) => {
      return track.artistsIds.map(artistId =>
        dataSources.artistService.getArtist(artistId)
      )
    },
    bands: async (track, __, { dataSources }) => {
      return track.bandsIds.map(bandId =>
        dataSources.bandService.getBand(bandId)
      )
    },
    genres: async (track, __, { dataSources }) => {
      return track.genresIds.map(genreId =>
        dataSources.genreService.getGenre(genreId)
      )
    },
  }
}

module.exports = {
  trackResolver
}
