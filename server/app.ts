import express from 'express'
import cors from 'cors'
import { NODE_ENV, corsOptions } from './config'
import morgan from 'morgan'
import urlRoutes from './routes/url.routes'
import { createSchema } from 'graphql-yoga'
import { createYoga } from 'graphql-yoga'
import typeDefs from './schemas/schema'
import resolvers from './resolvers/urlResolver'
import authRoutes from './routes/auth.routes'

const CookieParser = require('cookie-parser')

const app = express()

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(CookieParser())

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

app.use('/api/auth', authRoutes)
app.use('/api/url', urlRoutes)
app.use('/api/gql', yoga)

export default app
