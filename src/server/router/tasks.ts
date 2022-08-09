import { createRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";

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
  });
