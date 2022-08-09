import { createRouter } from "./context";
import { prisma } from "../db/client";
import { z } from "zod";

export const taskRouter = createRouter().query("get-all", {
  async resolve() {
    return await prisma.task.findMany();
  },
});
