// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { prisma } from "../db/client";
import { authRouter } from "./auth";

export const appRouter = createRouter()
  .query("getAllTasks", {
    async resolve() {
      return await prisma.task.findMany();
    },
  })
  .transformer(superjson)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
