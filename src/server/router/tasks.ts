import { createRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";
import { now } from "next-auth/client/_utils";

export const taskRouter = createRouter()
  .query("get-all", {
    async resolve() {
      return await prisma.task.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string().min(5).max(600),
    }),
    async resolve({ input }) {
      return await prisma.task.create({
        data: {
          name: input.name,
        },
      });
    },
  })
  .mutation("mark-as-done", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          achievedAt: new Date().toISOString(),
        },
      });
    },
  });
