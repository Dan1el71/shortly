import prisma from '../db'
import dateScalar from './dateScalar'

export default {
  Query: {
    urls: async () => {
      return await prisma.url.findMany()
    },
  },
  Mutation: {
    createUrl: async (
      _: any,
      { input }: { input: { url: string; slug: string } }
    ) => {
      const { url, slug } = input
      return await prisma.url.create({
        data: {
          url,
          slug,
        },
      })
    },
    deleteUrl: async (_: any, { id }: { id: number }) => {
      try {
        return await prisma.url.delete({
          where: { id },
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
  Url: {
    visits: async (_: any, { id }: { id: number }) => {
      const visits = await prisma.url.findFirst({
        where: { id },
        include: {
          _count: {
            select: { visits: true },
          },
        },
      })
      return visits ? visits._count.visits : 0
    },
  },
  Date: dateScalar,
}
