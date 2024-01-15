export default `
scalar Date

type Url {
  id: Int!
  url: String!
  slug: String!
  createdAt: Date!
  updatedAt: Date!
  visits: Int
}

type Visit {
  id: Int!
  createdAt: Date!
  url: Int!
}

type Query {
  urls: [Url!]!
}

input createUrl {
  url: String!
  slug: String!
}

type Mutation {
  createUrl(input: createUrl!): Url!
}
`
