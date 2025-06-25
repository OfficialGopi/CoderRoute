import { env } from "../../env";
import { PrismaClient } from "../prisma/client";

// This file is for initializing the Prisma Client.
const db = (globalThis.prisma as PrismaClient) ?? new PrismaClient(); // Create a new Prisma Client instance if it doesn't exist
// This is for development mode to prevent multiple instances of Prisma Client

if (env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

export { db };
