import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies.auth

    if (!cookie) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    jwt.verify(cookie, JWT_SECRET, (err: unknown, user: unknown) => {
      if (err)
        return res.status(401).json({
          message: 'Unauthorized',
        })
      req.user = user as Express.Request['user']
      next()
    })
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
}
