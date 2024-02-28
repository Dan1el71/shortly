import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient().$extends({
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
