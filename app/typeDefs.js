const { readFile } = require('node:fs/promises')
const { gql } = require('apollo-server')

module.exports = {
  getTypeDefs: async () => ([
    gql`${await readFile(`${__dirname}/modules/band/schemas/bands.graphql`)}`,
  ])
}
