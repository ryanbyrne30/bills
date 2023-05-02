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
    });
  }),
});
