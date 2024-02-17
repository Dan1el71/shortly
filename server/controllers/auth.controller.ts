import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { handleError } from '../utils/handleError'
import { uniqueNamesGenerator } from 'unique-names-generator'
import prisma from '../db'
import { JWT_SECRET, nameGeneratorConfig } from '../config'

export const emailLoginHandler = (req: Request, res: Response) => {
  res.send('login')
}

export const registerEmail = (req: Request, res: Response) => {
  res.send('register')
}

export const guestLogin = async (req: Request, res: Response) => {
  try {
    const username = uniqueNamesGenerator(nameGeneratorConfig)

    const account = await prisma.account.create({
      data: {
        provider: 'Guest',
      },
    })

    const user = await prisma.user.create({
      data: {
        username,
        userAcountId: account.uuid,
      },
    })

    const token = jwt.sign(
      {
        _id: user.uuid,
        username: user.username,
        guest: true,
      },
      JWT_SECRET,
      {
        expiresIn: '1d',
      }
    )

    res
      .cookie('auth', token, {
        expires: new Date(Date.now() + 86400000),
        maxAge: 86400000,
        httpOnly: true,
      })
      .status(200)
      .json({
        message: 'User created successfully!',
      })
  } catch (error) {
    handleError(res, error)
  }
}

export const profileHandler = async (req: Request, res: Response) => {
  return res.status(200).json({
    profile: req.user,
  })
}
