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
  Track: {
    id: getId,
  }
}

module.exports = {
  trackResolver
}
