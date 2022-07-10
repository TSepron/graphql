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
  },
  Genre: {
    id: getId,
  }
}

module.exports = {
  genreResolver
}
