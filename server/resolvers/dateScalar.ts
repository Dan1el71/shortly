import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: any) {
    if (value instanceof Date) {
      return value.getTime()
    }
    throw new GraphQLError('GraphQL Date Scalar serializer expected a `Date` object')
  },
  parseValue(value: any) {
    if (typeof value === 'number') {
      return new Date(value)
    }
    throw new GraphQLError('GraphQL Date Scalar parser expected a `number`')
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null
  },
})
