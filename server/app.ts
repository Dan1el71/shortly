import express from 'express'
import cors from 'cors'
import { corsOptions } from './config'
import morgan from 'morgan'
import urlRoutes from './routes/url.routes'

const app = express()

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/url', urlRoutes)

export default app
