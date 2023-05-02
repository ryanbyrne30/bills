import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "src/server/api/trpc";
import { prisma } from "src/server/db";

export const billsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.bill.findMany({
      take: 100,
      orderBy: {
        published: "desc",
      },
      include: {
        likes: true,
        dislikes: true,
      },
    });
  }),
  like: publicProcedure
    .input(
      z.object({
        billId: z.number(),
      })
    )
    .mutation(
      async ({ input }) =>
        await prisma.like.create({
          data: {
            billId: input.billId,
          },
        })
    ),
  dislike: publicProcedure
    .input(
      z.object({
        billId: z.number(),
      })
    )
    .mutation(
      async ({ input }) =>
        await prisma.dislike.create({
          data: {
            billId: input.billId,
          },
        })
    ),
});
