import { GraphQLError } from 'graphql'
import prisma from '../db'
import dateScalar from './dateScalar'

export default {
  Query: {
    urls: async () => {
      return await prisma.url.findMany()
    },
    userUrls: async (_: any, { AuthorId }: { AuthorId: string }) => {
      return await prisma.url.findMany({
        where: {
          AuthorId,
        },
      })
    },
  },
  Mutation: {
    createUrl: async (
      _: any,
      { input }: { input: { url: string; slug: string; AuthorId: string } }
    ) => {
      const { url, slug, AuthorId } = input
      const slugExists = await prisma.url.findFirst({
        where: {
          slug,
        },
      })

      if (slugExists) {
        throw new GraphQLError(`Slug '${slug}' already exists`)
      }

      return await prisma.url.create({
        data: {
          url,
          slug,
          AuthorId,
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
