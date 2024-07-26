import { PrismaClient } from "@prisma/client";

let dbConnectionCached: PrismaClient | null = null;

export async function dbConnection(production: boolean) {
  try {
    if (!dbConnectionCached) { 
      dbConnectionCached = new PrismaClient({
        log: production ? [] : ["info", "query"]
      });
    }
    await dbConnectionCached.$connect();
    return dbConnectionCached;
  } catch (_err) {
    console.error(_err);
    throw new Error("Internal Server Error: Error DB Connection");
  }
}

