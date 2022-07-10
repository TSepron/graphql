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
  Mutation: {
    createAlbum: async (_, { createAlbumFields }, { dataSources }) => {
      return dataSources.albumService.createAlbum(createAlbumFields)
    },
    deleteAlbum: async (_, { albumId }, { dataSources }) => {
      return dataSources.albumService.deleteAlbum(albumId)
    },
  },
  Album: {
    id: getId,
    artists: async (album, __, { dataSources }) => {
      return album.artistsIds.map(artistId =>
        dataSources.artistService.getArtist(artistId)
      )
    },
    bands: async (album, __, { dataSources }) => {
      return album.bandsIds.map(bandId =>
        dataSources.bandService.getBand(bandId)
      )
    },
    tracks: async (album, __, { dataSources }) => {
      return album.trackIds.map(trackId =>
        dataSources.trackService.getTrack(trackId)
      )
    },
    genres: async (album, __, { dataSources }) => {
      return album.genresIds.map(genreId =>
        dataSources.genreService.getGenre(genreId)
      )
    },
  }
}

module.exports = {
  albumResolver
}
