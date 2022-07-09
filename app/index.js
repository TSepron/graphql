const { ApolloServer } = require('apollo-server')
const { bandResolver } = require('./modules/band/resolvers/band.resolver')
const { BandService } = require('./modules/band/services/band.services')
const { getTypeDefs } = require('./typeDefs')
require('dotenv').config()

async function startGraphQLServer() {
  const typeDefs = await getTypeDefs()

  const server = new ApolloServer({
    typeDefs,
    resolvers: [
      bandResolver
    ],
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ req }) => ({
      authScope: req.headers.authorization
    }),
    dataSources: () => {
      return {
        bandService: new BandService(),
      }
    },
  })

  const { url } = await server.listen({
    port: process.env.PORT
  })

  console.log(`🚀  Server ready at ${url}`)
}

startGraphQLServer()
