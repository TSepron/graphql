const { getId } = require("../../../utils")

const userResolver = {
  Query: {
    user: async (_, { id }, { dataSources }) => {
      return dataSources.userService.getUser(id)
    },
  },
  Mutation: {
    loginUser: async (_, { email, password }, { dataSources }) => {
      return dataSources.userService.loginUser(email, password)
    },
  },
  User: {
    id: getId,
  },
  JWT: {
    jwt: async ({ jwt }, __, { dataSources }) => {
      return dataSources.userService.saveJWT(jwt)
    }
  }
}

module.exports = {
  userResolver
}
