import { Request, Response } from 'express'
import prisma from '../db'

export const getAllGuests = async (req: Request, res: Response) => {
  try {
    const accounts = await prisma.account.findMany({
      where: {
        provider: 'Guest',
      },
    })

    const user = await prisma.user.findMany({
      where: {
        userAcountId: {
          in: accounts.map((account) => account.uuid),
        },
      },
    })

    return res.status(200).json({
      user,
      accounts,
    })
  } catch (error) {
    console.error(error)
  }
}

export const deleteAllGuests = async (req: Request, res: Response) => {
  try {
    const accounts = await prisma.account.findMany({
      where: {
        provider: 'Guest',
      },
    })

    for (const account of accounts) {
      await prisma.user.delete({
        where: {
          userAcountId: account.uuid,
        },
      })

      await prisma.url.deleteMany({
        where: {
          AuthorId: account.uuid,
        },
      })
    }

    await prisma.account.deleteMany({
      where: {
        provider: 'Guest',
      },
    })

    return res.status(200).json({
      message: 'Guests deleted successfully!',
    })
  } catch (error) {
    console.error(error)
  }
}
