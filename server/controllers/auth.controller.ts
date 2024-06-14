import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { handleError } from '../utils/handleError'
import { uniqueNamesGenerator } from 'unique-names-generator'
import prisma from '../db'
import { JWT_SECRET, NODE_ENV, nameGeneratorConfig } from '../config'

export const emailLoginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      console.log(email, password)
      return res.status(400).json({
        message: 'All fields required',
      })
    }

    const account = await prisma.account.findFirst({
      where: {
        email,
      },
    })

    if (account) {
      const validPassword = await prisma.account.validPassword(
        password,
        account.password
      )

      const user = await prisma.user.findFirst({
        where: { userAcountId: account.uuid },
      })

      if (validPassword && user) {
        const token = jwt.sign(
          { _id: user.uuid, username: user.username },
          JWT_SECRET,
          { expiresIn: '1d' }
        )

        return res
          .cookie('auth', token, {
            expires: new Date(Date.now() + 86400000),
            maxAge: 86400000,
            httpOnly: true,
            secure: NODE_ENV === 'production',
          })
          .status(200)
          .json({
            message: 'Logged in successfully!',
          })
      }
    }

    return res.status(400).json({
      status: 'Unauthorized',
      message: 'Invalid credentials',
    })
  } catch (err) {
    handleError(res, err)
  }
}

export const registerEmail = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body

    if (!email || !username || !password) {
      return res.status(400).json({
        message: 'Please fill in all fields',
      })
    }

    const userExists = await prisma.user.findFirst({ where: { username } })
    const emailExists = await prisma.account.findFirst({ where: { email } })
    if (userExists || emailExists) {
      return res.status(400).json({
        message: 'User already exists',
      })
    }

    const account = await prisma.account.createAccount(email, password)
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
        secure: NODE_ENV === 'PRODUCTION',
      })
      .status(201)
      .json({
        message: 'Registered successfully!',
      })
  } catch (error) {
    handleError(res, error)
  }
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
        secure: NODE_ENV === 'PRODUCTION',
      })
      .status(200)
      .json({
        message: 'User created successfully!',
      })
  } catch (error) {
    handleError(res, error)
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    const guest = req.user.guest

    const user = await prisma.user.findFirst({
      where: {
        uuid: req.user._id.toString(),
      },
    })

    if (guest && user) {
      const transaction = await prisma.$transaction([
        prisma.url.deleteMany({
          where: {
            AuthorId: user.uuid,
          },
        }),
        prisma.user.delete({
          where: {
            uuid: user.uuid,
          },
        }),
        prisma.account.delete({
          where: {
            uuid: user.userAcountId,
          },
        }),
      ])

      await transaction
    }

    res.clearCookie('auth').status(200).json({
      message: 'Logged out successfully!',
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
