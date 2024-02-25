export default `
scalar Date

type Url {
  id: Int!
  url: String!
  slug: String!
  createdAt: Date!
  updatedAt: Date!
  AuthorId: String!
  visits: Int
}

type Visit {
  id: Int!
  createdAt: Date!
  url: Int!
}

type Query {
  urls: [Url!]!
  userUrls(AuthorId: String!): [Url!]!
}

input createUrl {
  url: String!
  slug: String!
  AuthorId: String!
}

type Mutation {
  createUrl(input: createUrl!): Url!
  deleteUrl(id: Int!): Url!
}
`
