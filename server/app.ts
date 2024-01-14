import express from 'express'
import cors from 'cors'
import { corsOptions } from './config'
import morgan from 'morgan'

const app = express()

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

export default app
