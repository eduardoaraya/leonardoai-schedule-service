import { PrismaClient } from "@prisma/client";

export const dbConnection = new PrismaClient({
  log: ["info", "query"] // TODO: Just for debugging in dev, to remove
});
