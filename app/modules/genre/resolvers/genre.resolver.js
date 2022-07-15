const { getId } = require("../../../utils")

const genreResolver = {
  Query: {
    genres: async (_, { limit }, { dataSources }) => {
      return dataSources.genreService.getGenres(limit)
    },
    genre: async (_, { id }, { dataSources }) => {
      return dataSources.genreService.getGenre(id)
    },
  },
  Mutation: {
    createGenre: async (_, { createGenreFields }, { dataSources }) => {
      return dataSources.genreService.createGenre(createGenreFields)
    },
    deleteGenre: async (_, { genreId }, { dataSources }) => {
      return dataSources.genreService.deleteGenre(genreId)
    },
    updateGenre: async (_, { genreId, updateGenreFields }, { dataSources }) => {
      return dataSources.genreService.updateGenre(genreId, updateGenreFields)
    },
  },
  Genre: {
    id: getId,
  }
}

module.exports = {
  genreResolver
}
