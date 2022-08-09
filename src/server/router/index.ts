// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { authRouter } from "./auth";
import { taskRouter } from "./tasks";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("questions.", taskRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
