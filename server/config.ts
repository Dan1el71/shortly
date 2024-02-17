import { config } from 'dotenv'
import { Config, adjectives, names } from 'unique-names-generator'

config()

export const PORT = process.env.PORT || 3000

const origin = process.env.ORIGIN || 'http://localhost:5173'

export const corsOptions = {
  origin: [origin],
  credentials: true,
}

export const nameGeneratorConfig: Config = {
  dictionaries: [names, adjectives],
  separator: '',
  style: 'capital',
}

export const NODE_ENV = process.env.NODE_ENV || 'development'

export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
