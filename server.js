const { ApolloServer, gql } = require('apollo-server')
const { resolvers } = require('./resolvers')

const { getUserId } = require('./utils')

const typeDefs = gql`
  type Query {
    me: User!
  }
  type Mutation {
    signup(name: String!, username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
  type AuthPayload {
    token: String
    id: Int
  }
  type User {
    id: Int
    email: String
    username: String
    name: String
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const userId = getUserId(req)
    return { ...req, userId }
  }
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
