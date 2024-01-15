import { Request, Response } from 'express'
import prisma from '../db'

export default async (req: Request, res: Response) => {
  const { slug } = req.query

  if (!slug || typeof slug !== 'string')
    return res.status(400).json({
      error: 'Invalid slug provided. Please try again.',
    })

  const data = await prisma.url.findFirst({
    where: {
      slug,
    },
  })

  if (!data) {
    return res.status(404).json({
      error: 'Link not found or removed.',
    })
  }

  res.setHeader('Cache-Control', 's-maxage=1000000, stale-while-revalidate')

  return res.json({
    data,
  })
}
