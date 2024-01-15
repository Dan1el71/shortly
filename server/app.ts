import express from 'express'
import cors from 'cors'
import { NODE_ENV, corsOptions } from './config'
import morgan from 'morgan'
import urlRoutes from './routes/url.routes'
import { createSchema } from 'graphql-yoga'
import { createYoga } from 'graphql-yoga'
import typeDefs from './schemas/schema'
import resolvers from './resolvers/urlResolver'

const app = express()

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

export const schema = createSchema({
  typeDefs,
  resolvers,
})

const yoga = createYoga({
  schema,
  graphiql: NODE_ENV === 'development' ? true : false,
  graphqlEndpoint: '/gql',
  landingPage: false,
})

app.use('/api/url', urlRoutes)
app.use('/api/gql', yoga)

export default app
