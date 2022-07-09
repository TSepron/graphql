const { readFile } = require('node:fs/promises')
const { gql } = require('apollo-server')

module.exports = {
  getTypeDefs: async () => ([
    gql`${await readFile(`${__dirname}/modules/band/schemas/band.graphql`)}`,
    gql`${await readFile(`${__dirname}/modules/track/schemas/track.graphql`)}`,
    gql`${await readFile(`${__dirname}/modules/album/schemas/album.graphql`)}`,
    gql`${await readFile(`${__dirname}/modules/artist/schemas/artist.graphql`)}`,
    gql`${await readFile(`${__dirname}/modules/genre/schemas/genre.graphql`)}`,
    gql`${await readFile(`${__dirname}/modules/user/schemas/user.graphql`)}`,
  ])
}
