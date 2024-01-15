import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000

const origin = process.env.ORIGIN || 'http://localhost:5173'

export const corsOptions = {
  origin: [origin],
  credentials: true,
}

export const NODE_ENV = process.env.NODE_ENV || 'development'
