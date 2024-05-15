import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from './config'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
})

const adapter = new PrismaLibSQL(libsql)

const prisma = new PrismaClient({
  adapter
}).$extends({
  model: {
    account: {
      async createAccount(email: string, password: string) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        return await prisma.account.create({
          data: {
            email,
            provider: 'Email',
            password: hashedPassword,
          },
        })
      },
      async validPassword(password: string, hashedPassword: string | null) {
        if (hashedPassword)
          return await bcrypt.compare(password, hashedPassword)
      },
    },
  },
})

export default prisma
