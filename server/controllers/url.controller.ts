import { Request, Response } from 'express'
import prisma from '../db'

export default async (req: Request, res: Response) => {
  const { slug } = req.params

  const data = await prisma.url.findFirst({
    where: {
      slug,
    },
  })

  if (!data) {
    return res.status(404).redirect('/')
  }

  res.setHeader('Cache-Control', 's-maxage=1000000, stale-while-revalidate')

  await prisma.visit.create({
    data: {
      url: data.id,
    },
  })

  return res.status(200).redirect(data.url)
}
