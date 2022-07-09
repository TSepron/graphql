const { ApolloServer } = require('apollo-server')
const { albumResolver } = require('./modules/album/resolvers/album.resolver')
const { AlbumService } = require('./modules/album/services/band.services')
const { artistResolver } = require('./modules/artist/resolvers/artist.resolver')
const { ArtistService } = require('./modules/artist/services/artist.services')
const { bandResolver } = require('./modules/band/resolvers/band.resolver')
const { BandService } = require('./modules/band/services/band.services')
const { genreResolver } = require('./modules/genre/resolvers/genre.resolver')
const { GenreService } = require('./modules/genre/services/genre.services')
const { trackResolver } = require('./modules/track/resolvers/track.resolver')
const { TrackService } = require('./modules/track/services/track.services')
const { userResolver } = require('./modules/user/resolvers/user.resolver')
const { UserService } = require('./modules/user/services/user.services')
const { getTypeDefs } = require('./typeDefs')
require('dotenv').config()

async function startGraphQLServer() {
  const typeDefs = await getTypeDefs()

  const server = new ApolloServer({
    typeDefs,
    resolvers: [
      bandResolver,
      trackResolver,
      albumResolver,
      artistResolver,
      genreResolver,
      userResolver
    ],
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ req }) => ({
      token: req.headers.authorization
    }),
    dataSources: () => {
      return {
        bandService: new BandService(),
        trackService: new TrackService(),
        albumService: new AlbumService(),
        artistService: new ArtistService(),
        genreService: new GenreService(),
        userService: new UserService()
      }
    },
  })

  const { url } = await server.listen({
    port: process.env.PORT
  })

  console.log(`🚀  Server ready at ${url}`)
}

startGraphQLServer()
